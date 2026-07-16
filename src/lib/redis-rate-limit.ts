import { getRedis } from "@/lib/redis";

type Result =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSeconds: number };

export async function assertRedisRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<Result | null> {
  const redis = getRedis();
  if (!redis) return null;

  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  if (count > limit) {
    return { ok: false, retryAfterSeconds: windowSeconds };
  }

  return { ok: true, remaining: Math.max(0, limit - count) };
}
