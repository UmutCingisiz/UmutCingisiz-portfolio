"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth, signIn, signOut } from "@/auth";
import {
  insertGuestbookEntry,
  updateGuestbookStatus,
  type GuestbookStatus,
} from "@/lib/guestbook";
import { assertGuestbookRateLimit } from "@/lib/guestbook-rate-limit";
import { isGuestbookModerator } from "@/lib/guestbook-admin";
import { logPortfolioError, logPortfolioEvent } from "@/lib/observability";

const messageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Mesaj boş olamaz.")
    .max(2000, "En fazla 2000 karakter."),
});

export type GuestbookMessageState = {
  ok: false;
  error: string;
} | null;

export async function submitGuestbookMessage(
  _prevState: GuestbookMessageState,
  formData: FormData,
): Promise<GuestbookMessageState> {
  const raw = formData.get("message");
  const parsed = messageSchema.safeParse({
    message: typeof raw === "string" ? raw : "",
  });

  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.message?.[0] ?? "Geçersiz mesaj.";
    return { ok: false, error: msg };
  }

  const session = await auth();
  const githubId = session?.user?.githubId;

  if (!githubId || !session?.user) {
    logPortfolioEvent("guestbook.auth_required");
    return {
      ok: false,
      error: "Mesaj yazmak için GitHub ile giriş yap.",
    };
  }

  const github_username =
    session.user.githubLogin ??
    session.user.name ??
    session.user.email?.split("@")[0] ??
    "misafir";

  const rate = await assertGuestbookRateLimit(githubId);
  if (!rate.ok) {
    logPortfolioEvent("guestbook.rate_limited");
    return { ok: false, error: rate.error };
  }

  try {
    await insertGuestbookEntry({
      message: parsed.data.message,
      github_id: githubId,
      github_username,
      avatar_url: session.user.image ?? null,
    });
  } catch (error) {
    logPortfolioError("guestbook.insert_failed", error);
    return {
      ok: false,
      error:
        "Mesaj kaydedilemedi. `DATABASE_URL` ve Neon tablosunu doğrula.",
    };
  }

  revalidatePath("/guestbook");
  logPortfolioEvent("guestbook.submitted");
  redirect("/guestbook?sent=1");
}

type ModeratableStatus = Exclude<GuestbookStatus, "pending">;

const moderateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["approved", "rejected"]) as z.ZodType<ModeratableStatus>,
});

export async function moderateGuestbookEntry(
  formData: FormData,
): Promise<void> {
  const session = await auth();
  if (!isGuestbookModerator(session?.user?.githubId)) {
    logPortfolioEvent("guestbook.moderation_denied");
    redirect("/guestbook?denied=1");
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = moderateSchema.safeParse(raw);
  if (!parsed.success) {
    logPortfolioEvent("guestbook.moderation_failed", { reason: "invalid_payload" });
    redirect("/guestbook?moderateErr=1");
  }

  try {
    const result = await updateGuestbookStatus(parsed.data.id, parsed.data.status);
    if (!result.ok) {
      logPortfolioEvent("guestbook.moderation_failed", { reason: "unchanged" });
      redirect("/guestbook?moderateErr=1");
    }
  } catch (error) {
    logPortfolioError("guestbook.moderation_failed", error);
    redirect("/guestbook?moderateErr=1");
  }

  revalidatePath("/guestbook");
  logPortfolioEvent("guestbook.moderated", { status: parsed.data.status });
  redirect("/guestbook?moderated=1");
}

export async function signInWithGithubAction() {
  await signIn("github", { redirectTo: "/guestbook" });
}

export async function signOutGuestbookAction() {
  await signOut({ redirectTo: "/guestbook" });
}