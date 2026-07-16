import { NextResponse } from "next/server";

import { incrementBlogViews, getBlogViews } from "@/lib/blog-views";
import { isBlogPostSlug } from "@/lib/blog-slugs";
import { anonymizeIp, getClientIp } from "@/lib/request-ip";
import { assertRedisRateLimit } from "@/lib/redis-rate-limit";
import { logPortfolioEvent } from "@/lib/observability";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  if (!slug || !isBlogPostSlug(slug)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const count = await getBlogViews(slug);
  return NextResponse.json({ count });
}

export async function POST(req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  if (!slug || !isBlogPostSlug(slug)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const ipHash = anonymizeIp(getClientIp(req.headers));
  const limit = await assertRedisRateLimit(
    `portfolio:ratelimit:views:${slug}:${ipHash}`,
    20,
    60 * 60,
  );
  if (limit && !limit.ok) {
    logPortfolioEvent("views.rate_limited", { slug });
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limit.retryAfterSeconds },
      { status: 429 },
    );
  }

  const updated = await incrementBlogViews(slug);
  if (updated === null) {
    logPortfolioEvent("views.kv_unconfigured", { slug });
    return NextResponse.json(
      {
        error: "kv_unconfigured",
        message: "Upstash yapılmadığı için sayım yapılmıyor.",
      },
      { status: 503 },
    );
  }
  return NextResponse.json({ count: updated });
}
