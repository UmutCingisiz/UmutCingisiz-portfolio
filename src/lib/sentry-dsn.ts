/** Resolve Sentry DSN without committing secrets. Prefer public client env in browser. */
export function getSentryDsn(): string {
  return (
    process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() ||
    process.env.SENTRY_DSN?.trim() ||
    process.env.OBSERVABILITY_DSN?.trim() ||
    ""
  );
}

export function isSentryEnabled(): boolean {
  const dsn = getSentryDsn();
  if (!dsn) return false;

  const provider = (process.env.OBSERVABILITY_PROVIDER || "")
    .trim()
    .toLowerCase();

  // DSN alone is enough; provider=sentry when set.
  return !provider || provider === "sentry";
}
