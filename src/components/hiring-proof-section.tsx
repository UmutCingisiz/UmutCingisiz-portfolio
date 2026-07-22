import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
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
  title: string;
  tagline: string;
  evidence: string;
  href: string;
  external?: boolean;
  icon: (props: { className?: string }) => ReactNode;
};

const ciUrl = `${siteConfig.githubRepo.replace(/\/$/, "")}/actions`;

const proofSignals: readonly Proof[] = [
  {
    title: "Uçtan uca ürün mimarisi",
    tagline: "auth · db · cache · mdx",
    evidence: "case study",
    href: "/projects/portfolio-web",
    icon: ArchIcon,
  },
  {
    title: "Kalite kapısı",
    tagline: "lint · test · typecheck · e2e",
    evidence: "CI workflows",
    href: ciUrl,
    external: true,
    icon: QualityIcon,
  },
  {
    title: "Güvenlik farkındalığı",
    tagline: "OAuth · rate-limit · Zod",
    evidence: "teknik yazı",
    href: "/blog/nextjs-server-actions-guvenlik",
    icon: SecurityIcon,
  },
  {
    title: "Ürün operasyonu",
    tagline: "moderasyon · guestbook",
    evidence: "canlı ürün",
    href: "/guestbook",
    icon: DeliveryIcon,
  },
];

const proofLinks: readonly {
  value: string;
  label: string;
  href: string;
  external?: boolean;
}[] = [
  { value: "Projeler", label: "case-study listesi", href: "/projects" },
  { value: "Blog", label: "teknik yazılar", href: "/blog" },
  { value: "CI", label: "kalite pipeline", href: ciUrl, external: true },
  { value: "Guestbook", label: "auth + moderasyon", href: "/guestbook" },
];

export function HiringProofSection() {
  return (
    <section
      id="hiring"
      className="relative overflow-hidden scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="ambient-orb -left-24 bottom-0 size-72 opacity-20 [animation-delay:1.5s]" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>hiring.proof</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            İşe alım kararını hızlandıran teknik kanıtlar.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
            Her kart tek bir doğrulanabilir kaynağa gider — sayılar değil, açık
            artifact’lar.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {proofLinks.map((item, index) => (
            <Reveal key={item.label} index={index}>
              <Link
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="surface-card block p-5 text-center transition-colors duration-[var(--motion-base)] hover:border-signal/30"
              >
                <p className="text-lg font-bold tracking-tight text-signal sm:text-xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofSignals.map((signal, index) => (
            <Reveal key={signal.title} index={index} className="h-full">
              <Link
                href={signal.href}
                {...(signal.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group block h-full"
              >
                <div className="surface-card relative flex h-full flex-col overflow-hidden p-6">
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border border-signal/25 bg-signal/[0.08] text-signal sm:size-14">
                      <signal.icon className="size-6 sm:size-7" />
                    </div>
                    <span className="max-w-[55%] break-words rounded-[var(--radius-sm)] border border-border bg-muted/50 px-2 py-1 text-right font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground sm:max-w-none sm:px-2.5 sm:tracking-[0.14em]">
                      {signal.evidence}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-base font-semibold tracking-tight text-foreground sm:mt-6 sm:text-lg">
                    {signal.title}
                  </h3>
                  <p className="relative mt-1 font-mono text-sm text-muted-foreground">
                    {signal.tagline}
                  </p>
                  <span className="relative mt-auto pt-5 text-sm font-medium text-signal">
                    Kanıtı incele →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
