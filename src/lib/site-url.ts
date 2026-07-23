/** Production / local site origin for canonicals and absolute URLs. */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (process.env.VERCEL_ENV === "production") {
    console.warn(
      "[site-url] NEXT_PUBLIC_SITE_URL missing in production — falling back to https://umutcingisiz.com",
    );
    return "https://umutcingisiz.com";
  }

  return "http://localhost:3000";
}

/** Absolute canonical URL for a path (`/` or `/projects/...`). */
export function canonicalFor(path = "/"): string {
  const origin = getSiteOrigin().replace(/\/$/, "");
  if (!path || path === "/") return origin;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
