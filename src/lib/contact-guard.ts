import { and, count, eq, gte } from "drizzle-orm";

import { requireDb } from "@/db/client";
import { contactSubmissionGuard } from "@/db/schema";

/** Son 24 saatte aynı e-postanın kaç ileti gönderdiği */
export async function countContactSubmissions24h(
  submissionKey: string,
): Promise<number> {
  const db = requireDb();
  const dayAgo = new Date(Date.now() - 86_400_000).toISOString();

  const rows = await db
    .select({ value: count() })
    .from(contactSubmissionGuard)
    .where(
      and(
        eq(contactSubmissionGuard.emailNormalized, submissionKey),
        gte(contactSubmissionGuard.createdAt, dayAgo),
      ),
    );

  return rows[0]?.value ?? 0;
}

export async function logContactSubmissionGuard(
  submissionKey: string,
): Promise<void> {
  const db = requireDb();

  await db.insert(contactSubmissionGuard).values({
    emailNormalized: submissionKey,
  });
}
