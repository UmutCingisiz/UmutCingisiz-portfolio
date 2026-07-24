import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { lighthouseHome } from "@/lib/lighthouse-metrics";
import { siteConfig } from "@/lib/site-config";

function ArchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 13.5 12 18.5l9-5" />
      <path d="M12 13v8" />
    </svg>
  );
}

function QualityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function SecurityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V5l-8-3Z" />
      <rect x="9" y="10" width="6" height="5" rx="1" />
      <path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10" />
    </svg>
  );
}

function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 16.5 3 21l4.5-1.5" />
      <path d="M15 6c3-3 6-3 6-3s0 3-3 6l-6.5 6.5-3-3L15 6Z" />
      <path d="M9 12l-3 1 1-3" />
    </svg>
  );
}

type Proof = {
  label: string;
  title: string;
  body: string;
  evidence: string;
  href: string;
  external?: boolean;
  icon: (props: { className?: string }) => ReactNode;
};

const ciUrl = `${siteConfig.githubRepo.replace(/\/$/, "")}/actions`;

const proofSignals: readonly Proof[] = [
  {
    label: "Mimari",
    title: "Uçtan uca ürün mimarisi",
    body: "App Router, Auth.js, Drizzle, Neon ve Redis aynı üründe çalışıyor.",
    evidence: "Vaka çalışması",
    href: "/projects/portfolio-web",
    icon: ArchIcon,
  },
  {
    label: "Kalite",
    title: "Kalite kapısı olan geliştirme",
    body: "Lint, typecheck, Vitest ve Playwright CI’da koşuyor.",
    evidence: "CI iş akışları",
    href: ciUrl,
    external: true,
    icon: QualityIcon,
  },
  {
    label: "Güvenlik",
    title: "Güvenlik farkındalığı",
    body: "OAuth, moderasyon, Zod, honeypot ve fail-closed rate-limit.",
    evidence: "Teknik yazı",
    href: "/blog/nextjs-server-actions-guvenlik",
    icon: SecurityIcon,
  },
  {
    label: "Yayın",
    title: "Yayınlanabilir deneyim",
    body: "SEO, OG, error/loading ve production servis planı hazır.",
    evidence: "Guestbook",
    href: "/guestbook",
    icon: DeliveryIcon,
  },
];

const reviewPath = [
  "60 sn: hero + kanıt sinyalleri",
  "2 dk: projelerde problem / karar / etki",
  "5 dk: blog + GitHub + guestbook",
] as const;

const quickLinks = [
  { value: "Projeler", label: "Vaka listesi", href: "/projects" },
  { value: "Blog", label: "Teknik yazılar", href: "/blog" },
  { value: "CI", label: "Kalite pipeline", href: ciUrl, external: true },
  { value: "Guestbook", label: "Auth + moderasyon", href: "/guestbook" },
] as const;

export function HiringProofSection() {
  const lh = lighthouseHome;

  return (
    <section
      id="hiring"
      className="relative scroll-mt-28 overflow-hidden px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
          <div className="lg:sticky lg:top-28">
            <SectionEyebrow>hiring.proof</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Tıklayıp bakabileceğiniz kanıtlar
            </h2>
            <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Her kart bir yere gider: case study, CI, yazı veya guestbook.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block rounded-xl border border-border bg-card/70 p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-4"
                >
                  <p className="text-base font-bold tracking-tight text-signal sm:text-lg">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-[0.7rem] text-muted-foreground sm:text-xs">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-4 rounded-[var(--radius-lg)] border border-border bg-muted/35 p-4 sm:mt-6 sm:p-5">
              <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                reviewer_path
              </p>
              <ol className="mt-3 space-y-2.5">
                {reviewPath.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-foreground">
                      0{index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 font-mono text-[0.65rem] leading-5 text-muted-foreground">
                Lighthouse ({lh.formFactor}) · Perf {lh.scores.performance} ·
                A11y {lh.scores.accessibility} · CLS {lh.metrics.cls} ·{" "}
                {lh.measuredAt}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {proofSignals.map((signal, index) => {
              const Icon = signal.icon;
              const linkProps = signal.external
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {};
              return (
                <Reveal key={signal.title} index={index}>
                  <article className="rounded-xl border border-border bg-card/70 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-foreground sm:size-10">
                          <Icon className="size-4 sm:size-5" />
                        </div>
                        <div>
                          <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                            {signal.label}
                          </p>
                          <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                            {signal.title}
                          </h3>
                        </div>
                      </div>
                      <span className="w-fit shrink-0 rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                        {signal.evidence}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {signal.body}
                    </p>
                    <Link
                      href={signal.href}
                      {...linkProps}
                      className="mt-4 inline-flex text-sm font-medium text-signal underline-offset-4 hover:underline"
                    >
                      Kanıtı incele →
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
