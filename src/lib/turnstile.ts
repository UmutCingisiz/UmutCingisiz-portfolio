/**
 * Cloudflare Turnstile — sunucu tarafı siteverify.
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

export const TURNSTILE_FORM_FIELD = "cf-turnstile-response";

type TurnstileSiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export type TurnstileVerifyResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; error: string };

function siteKeyConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());
}

/**
 * Turnstile doğrulaması.
 * - Her iki anahtar yoksa (yerel geliştirme): atlanır.
 * - Yalnızca biri varsa: fail-closed.
 * - İkisi de varsa: Cloudflare siteverify → `success: true` yeterli.
 */
export async function verifyTurnstileToken(
  token: unknown,
  remoteip?: string,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const hasSiteKey = siteKeyConfigured();

  if (!secret && !hasSiteKey) {
    return { ok: true, skipped: true };
  }

  if (!secret || !hasSiteKey) {
    return {
      ok: false,
      error:
        "Spam koruması yapılandırması eksik. Lütfen daha sonra tekrar dene veya e-posta ile ulaş.",
    };
  }

  if (typeof token !== "string" || token.trim() === "") {
    return {
      ok: false,
      error: "Spam doğrulaması tamamlanamadı. Lütfen sayfayı yenileyip tekrar dene.",
    };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token.trim(),
    });
    if (remoteip && remoteip !== "unknown") {
      body.set("remoteip", remoteip);
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );

    if (!res.ok) {
      return {
        ok: false,
        error: "Spam doğrulaması şu an yapılamıyor. Lütfen biraz sonra tekrar dene.",
      };
    }

    const data = (await res.json()) as TurnstileSiteverifyResponse;
    if (!data.success) {
      return {
        ok: false,
        error: "Spam doğrulaması başarısız. Lütfen tekrar dene.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Spam doğrulaması şu an yapılamıyor. Lütfen biraz sonra tekrar dene.",
    };
  }
}
