import { Redis } from "@upstash/redis";

let redisSingleton: Redis | null | undefined;

/** Upstash Redis (Vercel entegrasyonu / ortamda UPSTASH_REDIS_* görünür olmalı). */
export function getRedis(): Redis | null {
  if (redisSingleton !== undefined) return redisSingleton;

  try {
    const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
    const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
    if (!url || !token) {
      redisSingleton = null;
      return null;
    }
    redisSingleton = Redis.fromEnv();
    return redisSingleton;
  } catch {
    redisSingleton = null;
    return null;
  }
}
