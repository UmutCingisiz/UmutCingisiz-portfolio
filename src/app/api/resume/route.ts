import { existsSync } from "fs";
import path from "path";
import { redirect } from "next/navigation";

import { incrementResumeDownloads } from "@/lib/blog-views";
import { anonymizeIp, getClientIp } from "@/lib/request-ip";
import { assertRedisRateLimit } from "@/lib/redis-rate-limit";
import { logPortfolioEvent } from "@/lib/observability";
import { siteConfig } from "@/lib/site-config";

/**
 * İndirme istatistiği için sayaç; ardından `public/resume.pdf` dosyasına yönlendirir.
 * PDF yoksa ana sayfada bilgi mesajı gösterilir.
 */
export async function GET(req: Request) {
  const resumePath = path.join(process.cwd(), "public", "resume.pdf");

  if (!existsSync(resumePath)) {
    logPortfolioEvent("resume.missing");
    redirect("/?resume=missing");
  }

  const ipHash = anonymizeIp(getClientIp(req.headers));
  const limit = await assertRedisRateLimit(
    `portfolio:ratelimit:resume:${ipHash}`,
    10,
    60 * 60,
  );
  if (limit && !limit.ok) {
    logPortfolioEvent("resume.rate_limited");
    redirect("/?resume=limited");
  }

  await incrementResumeDownloads().catch(() => {});
  logPortfolioEvent("resume.downloaded");
  redirect(siteConfig.resumePath);
}
