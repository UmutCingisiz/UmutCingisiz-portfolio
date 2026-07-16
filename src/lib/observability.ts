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

export function logPortfolioEvent(event: PortfolioEvent, meta: EventMeta = {}) {
  const payload = {
    event,
    at: new Date().toISOString(),
    ...meta,
  };

  // Structured logs keep production observability portable across Vercel,
  // local dev, and future log drains without adding another dependency.
  console.info("[portfolio:event]", JSON.stringify(payload));
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
}
