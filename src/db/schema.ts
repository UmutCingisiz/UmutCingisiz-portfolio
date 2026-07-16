import { sql } from "drizzle-orm";
import {
  check,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const guestbookEntry = pgTable(
  "guestbook_entry",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    message: text("message").notNull(),
    githubId: text("github_id").notNull(),
    githubUsername: text("github_username").notNull(),
    avatarUrl: text("avatar_url"),
    status: text("status", {
      enum: ["pending", "approved", "rejected"],
    })
      .notNull()
      .default("pending"),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "guestbook_message_length",
      sql`char_length(trim(${table.message})) > 0 AND char_length(${table.message}) <= 2000`,
    ),
    check(
      "guestbook_status_check",
      sql`${table.status} IN ('pending', 'approved', 'rejected')`,
    ),
    index("idx_guestbook_approved_created")
      .on(table.createdAt.desc())
      .where(sql`${table.status} = 'approved'`),
    index("idx_guestbook_pending")
      .on(table.createdAt.asc())
      .where(sql`${table.status} = 'pending'`),
    index("idx_guestbook_github_created_at").on(
      table.githubId,
      table.createdAt.desc(),
    ),
  ],
);

export const contactSubmissionGuard = pgTable(
  "contact_submission_guard",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    emailNormalized: text("email_normalized").notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_contact_guard_email_created").on(
      table.emailNormalized,
      table.createdAt.desc(),
    ),
  ],
);

export type GuestbookEntry = typeof guestbookEntry.$inferSelect;
export type NewGuestbookEntry = typeof guestbookEntry.$inferInsert;
export type ContactSubmissionGuard = typeof contactSubmissionGuard.$inferSelect;
