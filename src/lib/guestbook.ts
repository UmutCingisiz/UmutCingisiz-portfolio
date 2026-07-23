import { and, asc, desc, eq, ne } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { z } from "zod";

import { requireDb } from "@/db/client";
import { guestbookEntry } from "@/db/schema";

/** Cache tag — invalidate on approve / hide / restore */
export const GUESTBOOK_APPROVED_TAG = "guestbook-approved";

export type GuestbookStatus = "pending" | "approved" | "rejected";

export type GuestbookEntryRow = {
  id: string;
  message: string;
  github_id: string;
  github_username: string;
  avatar_url: string | null;
  status: GuestbookStatus;
  /** ISO-friendly string from driver */
  created_at: string;
};

const uuidSchema = z.string().uuid();

export async function insertGuestbookEntry(input: {
  message: string;
  github_id: string;
  github_username: string;
  avatar_url: string | null;
}) {
  const db = requireDb();

  await db.insert(guestbookEntry).values({
    message: input.message,
    githubId: input.github_id,
    githubUsername: input.github_username,
    avatarUrl: input.avatar_url,
    status: "pending",
  });
}

function toGuestbookEntryRow(
  row: typeof guestbookEntry.$inferSelect,
): GuestbookEntryRow {
  return {
    id: row.id,
    message: row.message,
    github_id: row.githubId,
    github_username: row.githubUsername,
    avatar_url: row.avatarUrl,
    status: row.status,
    created_at: row.createdAt,
  };
}

export async function listApprovedEntries(
  limit = 30,
): Promise<GuestbookEntryRow[]> {
  const db = requireDb();

  const rows = await db
    .select()
    .from(guestbookEntry)
    .where(eq(guestbookEntry.status, "approved"))
    .orderBy(desc(guestbookEntry.createdAt))
    .limit(limit);

  return rows.map(toGuestbookEntryRow);
}

/**
 * Public approved list — safe to cache across requests.
 * Page stays dynamic (auth/session), but this query need not hit Neon every time.
 */
export function listCachedApprovedEntries(
  limit = 30,
): Promise<GuestbookEntryRow[]> {
  return unstable_cache(
    async () => listApprovedEntries(limit),
    ["guestbook-approved-entries", String(limit)],
    { revalidate: 60, tags: [GUESTBOOK_APPROVED_TAG] },
  )();
}

export async function listPendingEntries(
  limit = 50,
): Promise<GuestbookEntryRow[]> {
  const db = requireDb();

  const rows = await db
    .select()
    .from(guestbookEntry)
    .where(eq(guestbookEntry.status, "pending"))
    .orderBy(asc(guestbookEntry.createdAt))
    .limit(limit);

  return rows.map(toGuestbookEntryRow);
}

export async function listRejectedEntries(
  limit = 50,
): Promise<GuestbookEntryRow[]> {
  const db = requireDb();

  const rows = await db
    .select()
    .from(guestbookEntry)
    .where(eq(guestbookEntry.status, "rejected"))
    .orderBy(desc(guestbookEntry.createdAt))
    .limit(limit);

  return rows.map(toGuestbookEntryRow);
}

export async function updateGuestbookStatus(
  entryId: string,
  status: GuestbookStatus,
): Promise<{ ok: boolean }> {
  uuidSchema.parse(entryId);

  const db = requireDb();

  const updated = await db
    .update(guestbookEntry)
    .set({ status })
    .where(and(eq(guestbookEntry.id, entryId), ne(guestbookEntry.status, status)))
    .returning({ id: guestbookEntry.id });

  return { ok: updated.length > 0 };
}