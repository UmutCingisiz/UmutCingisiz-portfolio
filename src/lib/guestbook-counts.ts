import { and, count, eq, gte } from "drizzle-orm";

import { requireDb } from "@/db/client";
import { guestbookEntry } from "@/db/schema";

/**
 * Tek sorguda GitHub kullanıcısının son 1 dakika ve son 24 saatteki gönderim sayıları.
 * Ziyaretçi defteri gönderim oranı için kullanılır.
 */
export async function getGuestbookSubmissionCounts(githubId: string): Promise<{
  lastMinute: number;
  lastDay: number;
}> {
  const db = requireDb();
  const now = Date.now();
  const minuteAgo = new Date(now - 60_000).toISOString();
  const dayAgo = new Date(now - 86_400_000).toISOString();

  const [minuteRow, dayRow] = await Promise.all([
    db
      .select({ value: count() })
      .from(guestbookEntry)
      .where(
        and(
          eq(guestbookEntry.githubId, githubId),
          gte(guestbookEntry.createdAt, minuteAgo),
        ),
      ),
    db
      .select({ value: count() })
      .from(guestbookEntry)
      .where(
        and(
          eq(guestbookEntry.githubId, githubId),
          gte(guestbookEntry.createdAt, dayAgo),
        ),
      ),
  ]);

  return {
    lastMinute: minuteRow[0]?.value ?? 0,
    lastDay: dayRow[0]?.value ?? 0,
  };
}
