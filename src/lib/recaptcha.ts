/**
 * Google reCAPTCHA v2 (“Robot değilim”) — sunucu tarafı siteverify.
 * @see https://developers.google.com/recaptcha/docs/verify
 */

export const RECAPTCHA_FORM_FIELD = "g-recaptcha-response";

type RecaptchaSiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export type RecaptchaVerifyResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; error: string };

function siteKeyConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim());
}

/**
 * reCAPTCHA v2 doğrulaması.
 * - Anahtarlar yoksa (yerel geliştirme): atlanır.
 * - Site key var ama secret yoksa: fail-closed.
 * - Secret varsa: Google siteverify → `success: true` yeterli.
 */
export async function verifyRecaptchaToken(
  token: unknown,
  remoteip?: string,
): Promise<RecaptchaVerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  const hasSiteKey = siteKeyConfigured();

  if (!secret) {
    if (hasSiteKey) {
      return {
        ok: false,
        error:
          "Spam koruması yapılandırması eksik. Lütfen daha sonra tekrar dene veya e-posta ile ulaş.",
      };
    }
    return { ok: true, skipped: true };
  }

  if (typeof token !== "string" || token.trim() === "") {
    return {
      ok: false,
      error: "Lütfen 'Robot değilim' doğrulamasını tamamla.",
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

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      return {
        ok: false,
        error: "Spam doğrulaması şu an yapılamıyor. Lütfen biraz sonra tekrar dene.",
      };
    }

    const data = (await res.json()) as RecaptchaSiteverifyResponse;
    if (!data.success) {
      return {
        ok: false,
        error: "Spam doğrulaması başarısız. Lütfen kutuyu yeniden onayla.",
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
