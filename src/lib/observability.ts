import * as Sentry from "@sentry/nextjs";
import { isSentryEnabled } from "@/lib/sentry-dsn";

type PortfolioEvent =
  | "contact.rate_limit_guard_failed"
  | "contact.rate_limited"
  | "contact.service_unconfigured"
  | "contact.send_failed"
  | "contact.sent"
  | "guestbook.auth_required"
  | "guestbook.rate_limited"
  | "guestbook.insert_failed"
  | "guestbook.submitted"
  | "guestbook.moderation_denied"
  | "guestbook.moderation_failed"
  | "guestbook.moderated"
  | "views.rate_limited"
  | "views.kv_unconfigured"
  | "resume.missing"
  | "resume.rate_limited"
  | "resume.downloaded";

type EventMeta = Record<string, string | number | boolean | null | undefined>;

const ALERT_EVENTS = new Set<PortfolioEvent>([
  "contact.rate_limit_guard_failed",
  "contact.rate_limited",
  "contact.service_unconfigured",
  "contact.send_failed",
  "guestbook.auth_required",
  "guestbook.rate_limited",
  "guestbook.insert_failed",
  "guestbook.moderation_denied",
  "guestbook.moderation_failed",
  "views.rate_limited",
  "views.kv_unconfigured",
  "resume.missing",
  "resume.rate_limited",
]);

function toSentryContext(meta: EventMeta) {
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (value === null || value === undefined) continue;
    cleaned[key] = value;
  }
  return cleaned;
}

export function logPortfolioEvent(event: PortfolioEvent, meta: EventMeta = {}) {
  const payload = {
    event,
    at: new Date().toISOString(),
    ...meta,
  };

  // Structured logs keep production observability portable across Vercel,
  // local dev, and future log drains without adding another dependency.
  console.info("[portfolio:event]", JSON.stringify(payload));

  if (!isSentryEnabled()) return;

  const extras = toSentryContext(meta);
  Sentry.addBreadcrumb({
    category: "portfolio",
    message: event,
    level: ALERT_EVENTS.has(event) ? "warning" : "info",
    data: extras,
  });

  // Only surface operational problems as Issues — success events stay breadcrumbs.
  if (ALERT_EVENTS.has(event)) {
    Sentry.captureMessage(event, {
      level: "warning",
      tags: { portfolio_event: event },
      extra: extras,
    });
  }
}

export function logPortfolioError(
  event: PortfolioEvent,
  error: unknown,
  meta: EventMeta = {},
) {
  const message = error instanceof Error ? error.message : "unknown_error";
  console.error(
    "[portfolio:error]",
    JSON.stringify({
      event,
      at: new Date().toISOString(),
      error: message,
      ...meta,
    }),
  );

  if (!isSentryEnabled()) return;

  Sentry.withScope((scope) => {
    scope.setTag("portfolio_event", event);
    scope.setExtras(toSentryContext(meta));
    if (error instanceof Error) {
      Sentry.captureException(error);
    } else {
      Sentry.captureMessage(`${event}: ${message}`, "error");
    }
  });
}
