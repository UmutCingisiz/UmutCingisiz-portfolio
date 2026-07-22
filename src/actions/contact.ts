"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";

import {
  countContactSubmissions24h,
  logContactSubmissionGuard,
} from "@/lib/contact-guard";
import {
  parseContactFormFields,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { logPortfolioError, logPortfolioEvent } from "@/lib/observability";
import { siteConfig } from "@/lib/site-config";

export type ContactFormState =
  | {
      ok: false;
      error: string;
      fieldErrors?: ContactFieldErrors;
    }
  | null;

const MAX_PER_DAY_PER_EMAIL = 5;
const MAX_PER_DAY_PER_IP = 20;

function normalizeEmail(e: string) {
  return e.trim().toLowerCase();
}

function hashKey(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 24);
}

async function getClientIpKey() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const real = h.get("x-real-ip")?.trim();
  const ip = forwarded || real || "unknown";
  return `ip:${hashKey(ip)}`;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const trap = formData.get("_company_website_trap");
  if (typeof trap === "string" && trap.trim() !== "") {
    redirect("/?contact=sent");
  }

  const parsed = parseContactFormFields({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.ok) {
    return {
      ok: false,
      error: parsed.error,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const emailKey = `email:${normalizeEmail(parsed.data.email)}`;
  const ipKey = await getClientIpKey();

  let emailPrior: number;
  let ipPrior: number;
  try {
    [emailPrior, ipPrior] = await Promise.all([
      countContactSubmissions24h(emailKey),
      countContactSubmissions24h(ipKey),
    ]);
  } catch (error) {
    // Fail-closed: never treat a guard outage as "zero prior sends".
    logPortfolioError("contact.rate_limit_guard_failed", error);
    return {
      ok: false,
      error:
        "Güvenlik kontrolü şu an yapılamıyor. Lütfen biraz sonra tekrar dene veya e-posta ile ulaş.",
    };
  }

  if (emailPrior >= MAX_PER_DAY_PER_EMAIL) {
    logPortfolioEvent("contact.rate_limited", { dimension: "email" });
    return {
      ok: false,
      error: `Bu e-postadan 24 saat içinde en fazla ${MAX_PER_DAY_PER_EMAIL} mesaj gönderilebilir.`,
    };
  }

  if (ipPrior >= MAX_PER_DAY_PER_IP) {
    logPortfolioEvent("contact.rate_limited", { dimension: "ip" });
    return {
      ok: false,
      error:
        "Bu ağdan çok fazla mesaj gönderildi. Bir süre sonra tekrar deneyebilirsin.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    logPortfolioEvent("contact.service_unconfigured", { missing: "RESEND_API_KEY" });
    return {
      ok: false,
      error:
        "İletişim servisi şu an etkin değil. Lütfen e-posta bağlantısını kullanarak ulaş.",
    };
  }

  const notifyTo =
    process.env.CONTACT_NOTIFY_EMAIL?.trim() ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!from) {
    logPortfolioEvent("contact.service_unconfigured", { missing: "CONTACT_FROM_EMAIL" });
    return {
      ok: false,
      error:
        "İletişim servisi ayarları tamamlanmadı. Lütfen daha sonra tekrar dene.",
    };
  }

  const subject = `[Portfolyo] ${parsed.data.name} — iletişim`;
  const text =[
    `İsim: ${parsed.data.name}`,
    `E-posta: ${parsed.data.email}`,
    "",
    parsed.data.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: parsed.data.email,
      subject,
      text,
    });
  } catch (error) {
    logPortfolioError("contact.send_failed", error);
    return {
      ok: false,
      error: "Mesaj şimdilik gönderilemedi. Lütfen biraz sonra tekrar dene.",
    };
  }

  // Başarılı gönderimden sonra log atılamazsa sessizce devam et
  await Promise.all([
    logContactSubmissionGuard(emailKey),
    logContactSubmissionGuard(ipKey),
  ]).catch((error) => {
    logPortfolioError("contact.rate_limit_guard_failed", error, { phase: "write" });
  });
  logPortfolioEvent("contact.sent");
  
  redirect("/?contact=sent");
}