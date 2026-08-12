CREATE TABLE "project_override" (
	"slug" text PRIMARY KEY NOT NULL,
	"status" text,
	"featured" boolean,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by_github_id" text NOT NULL,
	CONSTRAINT "project_override_status_check" CHECK ("status" IS NULL OR "status" IN ('planned', 'in-progress', 'testing', 'live', 'archived', 'learning'))
);
