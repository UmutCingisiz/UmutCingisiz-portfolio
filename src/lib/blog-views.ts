import { getRedis } from "@/lib/redis";

const PREFIX = "portfolio:blog:views";

export function blogViewKey(slug: string): string {
  return `${PREFIX}:${slug}`;
}

export async function getBlogViews(slug: string): Promise<number | null> {
  const redis = getRedis();
  if (!redis) return null;

  const raw = await redis.get<number | string>(blogViewKey(slug));
  if (raw == null) return 0;
  return typeof raw === "number" ? raw : Number(raw);
}

/** Redis yoksa hata üretmez; çağıran uygun kod döndürmeli. */
export async function incrementBlogViews(slug: string): Promise<number | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.incr(blogViewKey(slug));
}

const RESUME_KEY = "portfolio:resume:downloads";

export async function incrementResumeDownloads(): Promise<number | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.incr(RESUME_KEY);
}
