/** Contact rate-limit kararları — fail-closed guard için saf helper. */

export const CONTACT_MAX_PER_DAY_PER_EMAIL = 5;
export const CONTACT_MAX_PER_DAY_PER_IP = 20;

export type ContactRateLimitDecision =
  | { ok: true }
  | { ok: false; error: string; dimension: "guard" | "email" | "ip" };

/**
 * Guard okunamazsa asla "0 prior" varsayma — fail-closed.
 */
export function decideContactRateLimit(input: {
  guardFailed: boolean;
  emailPrior: number;
  ipPrior: number;
  maxEmail?: number;
  maxIp?: number;
}): ContactRateLimitDecision {
  const maxEmail = input.maxEmail ?? CONTACT_MAX_PER_DAY_PER_EMAIL;
  const maxIp = input.maxIp ?? CONTACT_MAX_PER_DAY_PER_IP;

  if (input.guardFailed) {
    return {
      ok: false,
      dimension: "guard",
      error:
        "Güvenlik kontrolü şu an yapılamıyor. Lütfen biraz sonra tekrar dene veya e-posta ile ulaş.",
    };
  }

  if (input.emailPrior >= maxEmail) {
    return {
      ok: false,
      dimension: "email",
      error: `Bu e-postadan 24 saat içinde en fazla ${maxEmail} mesaj gönderilebilir.`,
    };
  }

  if (input.ipPrior >= maxIp) {
    return {
      ok: false,
      dimension: "ip",
      error:
        "Bu ağdan çok fazla mesaj gönderildi. Bir süre sonra tekrar deneyebilirsin.",
    };
  }

  return { ok: true };
}
