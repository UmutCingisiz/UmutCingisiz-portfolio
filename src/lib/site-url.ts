/** Production / local site origin for canonicals and absolute URLs. */
export function getSiteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

/** Absolute canonical URL for a path (`/` or `/projects/...`). */
export function canonicalFor(path = "/"): string {
  const origin = getSiteOrigin().replace(/\/$/, "");
  if (!path || path === "/") return origin;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
