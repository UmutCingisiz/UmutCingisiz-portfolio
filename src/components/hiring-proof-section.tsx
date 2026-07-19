import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

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
  icon: (props: { className?: string }) => ReactNode;
};

/* Tam 4 sinyal — 2x2/1x4 grid'de eksik hücre bırakmadan tam oturur. Soft-skill/
   liderlik kanıtı burada değil, about.engineer zaman çizelgesinde yaşıyor. */
const proofSignals: readonly Proof[] = [
  {
    title: "Uçtan uca ürün mimarisi",
    tagline: "auth · db · cache · mdx",
    evidence: "full-stack",
    href: "/projects/portfolio-web",
    icon: ArchIcon,
  },
  {
    title: "Kalite kapısı",
    tagline: "lint · test · CI",
    evidence: "quality gate",
    href: "/projects/portfolio-web",
    icon: QualityIcon,
  },
  {
    title: "Güvenlik farkındalığı",
    tagline: "OAuth · rate-limit",
    evidence: "secure by default",
    href: "/blog/nextjs-server-actions-guvenlik",
    icon: SecurityIcon,
  },
  {
    title: "Yayınlanabilir deneyim",
    tagline: "SEO · OG · error UX",
    evidence: "deploy-ready",
    href: "/#contact",
    icon: DeliveryIcon,
  },
];

const proofMetrics = [
  { value: "3", label: "case-study proje" },
  { value: "3", label: "teknik blog" },
  { value: "E2E", label: "smoke test" },
  { value: "6", label: "kalite komutu" },
] as const;

export function HiringProofSection() {
  return (
    <section className="relative overflow-hidden scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="ambient-orb -left-24 bottom-0 size-72 opacity-20 [animation-delay:1.5s]" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>hiring.proof</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            İşe alım kararını hızlandıran teknik kanıtlar.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
            Uzun paragraflar değil, doğrulanabilir sinyaller. Her kanıt tek
            bakışta okunur: ikon, başlık ve kanıtın kaynağı.
          </p>
        </div>

        {/* Metrik şeridi */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {proofMetrics.map((metric, index) => (
            <Reveal key={metric.label} index={index}>
              <div className="premium-card rounded-2xl p-5 text-center">
                <p className="text-3xl font-bold tracking-tight text-signal">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* İkon-odaklı kanıt ızgarası: 4 sinyal, eksik hücre bırakmayan düzen. */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofSignals.map((signal, index) => (
            <Reveal key={signal.title} index={index} className="h-full">
              <Link href={signal.href} className="group block h-full">
                <TiltCard
                  as="div"
                  max={8}
                  className="premium-card gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl p-6"
                >
                  <div className="bento-dots pointer-events-none absolute -right-6 -top-6 size-36 rounded-full opacity-40 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-signal/25 bg-signal/[0.08] text-signal shadow-[0_0_24px_var(--signal-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <signal.icon className="size-7" />
                    </div>
                    <span className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {signal.evidence}
                    </span>
                  </div>
                  <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-foreground">
                    {signal.title}
                  </h3>
                  <p className="relative mt-1 font-mono text-sm text-muted-foreground">
                    {signal.tagline}
                  </p>
                  <span className="relative mt-auto pt-5 text-sm font-medium text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Kanıtı incele →
                  </span>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
