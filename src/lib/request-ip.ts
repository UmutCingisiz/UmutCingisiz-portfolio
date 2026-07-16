import { createHash } from "crypto";

type HeaderReader = {
  get(name: string): string | null;
};

export function getClientIp(headers: HeaderReader): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headers.get("x-real-ip")?.trim();
  return forwarded || realIp || "unknown";
}

export function anonymizeIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 24);
}
