CREATE TABLE "contact_submission_guard" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email_normalized" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guestbook_entry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text NOT NULL,
	"github_id" text NOT NULL,
	"github_username" text NOT NULL,
	"avatar_url" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guestbook_message_length" CHECK (char_length(trim("guestbook_entry"."message")) > 0 AND char_length("guestbook_entry"."message") <= 2000),
	CONSTRAINT "guestbook_status_check" CHECK ("guestbook_entry"."status" IN ('pending', 'approved', 'rejected'))
);
--> statement-breakpoint
CREATE INDEX "idx_contact_guard_email_created" ON "contact_submission_guard" USING btree ("email_normalized","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_guestbook_approved_created" ON "guestbook_entry" USING btree ("created_at" DESC NULLS LAST) WHERE "guestbook_entry"."status" = 'approved';--> statement-breakpoint
CREATE INDEX "idx_guestbook_pending" ON "guestbook_entry" USING btree ("created_at") WHERE "guestbook_entry"."status" = 'pending';--> statement-breakpoint
CREATE INDEX "idx_guestbook_github_created_at" ON "guestbook_entry" USING btree ("github_id","created_at" DESC NULLS LAST);