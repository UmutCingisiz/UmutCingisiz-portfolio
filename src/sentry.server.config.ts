import * as Sentry from "@sentry/nextjs";
import { getSentryDsn, isSentryEnabled } from "@/lib/sentry-dsn";

Sentry.init({
  dsn: getSentryDsn() || undefined,
  enabled: isSentryEnabled(),
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
});
