import { getGuestbookSubmissionCounts } from "@/lib/guestbook-counts";

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  const s = raw?.trim() ?? "";
  if (s === "") return fallback;
  const n = Number.parseInt(s, 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return n;
}

export function getGuestbookRateLimits() {
  const perMinute = parsePositiveInt(
    process.env.GUESTBOOK_RATE_PER_MINUTE,
    5,
  );
  const perDay = parsePositiveInt(process.env.GUESTBOOK_RATE_PER_DAY, 30);
  return {
    perMinute,
    /** Günlük tavan, dakikalık tavandan en az bu kadar büyük olur */
    perDay: Math.max(perDay, perMinute),
  };
}

export type GuestbookRateLimitResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * GitHub kimliğine göre dakika + gün limiti (Neon’daki mevcut kayıtlar üzerinden).
 */
export async function assertGuestbookRateLimit(
  githubId: string,
): Promise<GuestbookRateLimitResult> {
  const { perMinute, perDay } = getGuestbookRateLimits();
  const counts = await getGuestbookSubmissionCounts(githubId).catch(() => null);

  if (!counts) {
    return {
      ok: false,
      error:
        "Mesaj limiti doğrulanamadı. Veritabanı bağlantısını kontrol edip tekrar dene.",
    };
  }

  const { lastMinute, lastDay } = counts;

  if (lastMinute >= perMinute) {
    return {
      ok: false,
      error: `Çok hızlı gönderiyorsun. Dakikada en fazla ${perMinute} mesaj bırakılabilir; biraz bekleyip tekrar dene.`,
    };
  }

  if (lastDay >= perDay) {
    return {
      ok: false,
      error: `Günlük mesaj limitine ulaştın (${perDay}). Yarın tekrar deneyebilirsin.`,
    };
  }

  return { ok: true };
}
