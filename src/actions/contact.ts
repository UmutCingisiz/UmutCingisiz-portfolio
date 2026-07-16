"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";

import {
  countContactSubmissions24h,
  logContactSubmissionGuard,
} from "@/lib/contact-guard";
import { siteConfig } from "@/lib/site-config";

const schema = z.object({
  name: z.string().trim().min(2, "İsim çok kısa.").max(120, "İsim çok uzun."),
  email: z.string().trim().email("Geçerli bir e-posta gir."),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olsun.")
    .max(4000, "Mesaj çok uzun."),
});

export type ContactFormState =
  | { ok: false; error: string }
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

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    const err =
      flat.fieldErrors.name?.[0] ??
      flat.fieldErrors.email?.[0] ??
      flat.fieldErrors.message?.[0] ??
      "Form geçersiz.";
    return { ok: false, error: err };
  }

  const emailKey = `email:${normalizeEmail(parsed.data.email)}`;
  const ipKey = await getClientIpKey();
  
  const [emailPrior, ipPrior] = await Promise.all([
    countContactSubmissions24h(emailKey),
    countContactSubmissions24h(ipKey),
  ]).catch((error) => {
    console.error("[Contact Form Guard] Rate limit DB error:", error);
    return [0, 0];
  });

  if (emailPrior >= MAX_PER_DAY_PER_EMAIL) {
    return {
      ok: false,
      error: `Bu e-postadan 24 saat içinde en fazla ${MAX_PER_DAY_PER_EMAIL} mesaj gönderilebilir.`,
    };
  }

  if (ipPrior >= MAX_PER_DAY_PER_IP) {
    return {
      ok: false,
      error:
        "Bu ağdan çok fazla mesaj gönderildi. Bir süre sonra tekrar deneyebilirsin.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Iletisim servisi su an etkin degil. Lutfen e-posta baglantisini kullanarak ulas.",
    };
  }

  const notifyTo =
    process.env.CONTACT_NOTIFY_EMAIL?.trim() ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!from) {
    return {
      ok: false,
      error: "Iletisim servisi ayarlari tamamlanmadi. Lutfen daha sonra tekrar dene.",
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
    console.error("[Contact Form Resend] Email send error:", error);
    return {
      ok: false,
      error: "Mesaj simdilik gonderilemedi. Lutfen biraz sonra tekrar dene.",
    };
  }

  // Başarılı gönderimden sonra log atılamazsa sessizce devam et
  await Promise.all([
    logContactSubmissionGuard(emailKey),
    logContactSubmissionGuard(ipKey),
  ]).catch((error) => {
    console.error("[Contact Form Guard] DB log entry failed:", error);
  });
  
  redirect("/?contact=sent");
}