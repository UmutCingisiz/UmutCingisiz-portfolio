import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { siteConfig } from "@/lib/site-config";

const standards = [
  {
    label: "performance",
    title: "Performans bütçesi",
    target: "Hedef checklist · LCP / CLS / INP (ölçüm sonrası güncellenir)",
    body: "Hero görseli, server-first bölümler ve kontrollü animasyonlarla görsel kaliteyi hızdan ödün vermeden koruma hedefi. Canlı Lighthouse skorları eklendikçe burası somutlaşır.",
    icon: GaugeIcon,
  },
  {
    label: "accessibility",
    title: "Erişilebilirlik disiplini",
    target: "Keyboard flow · visible focus · semantic sections",
    body: "Skip link, landmark akışı, yüksek kontrast ve sade hiyerarşi ile portfolyo herkes için okunabilir kalmalı.",
    icon: A11yIcon,
  },
] as const;

function GaugeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M12 15V9" strokeLinecap="round" />
      <path d="M6.5 17.5A7.5 7.5 0 1 1 17.5 17.5" strokeLinecap="round" />
      <path d="M4 20h16" strokeLinecap="round" />
    </svg>
  );
}

function A11yIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <circle cx="12" cy="5" r="2" />
      <path d="M5 10h14" strokeLinecap="round" />
      <path d="M12 10v10" strokeLinecap="round" />
      <path d="M8 20l4-6 4 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ciUrl = `${siteConfig.githubRepo.replace(/\/$/, "")}/actions`;

export function QualityStandardsSection() {
  return (
    <section
      id="quality"
      className="relative overflow-hidden scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="ambient-orb -right-20 top-1/3 size-64 opacity-20 [animation-delay:3s]" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>quality.standards</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ölçülebilir kalite hedefleri — manifesto değil, checklist.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Güvenlik ve ürün operasyonu kanıtları{" "}
              <Link href="/#hiring" className="underline underline-offset-4 hover:text-foreground">
                hiring.proof
              </Link>{" "}
              bölümünde; burada performans ve erişilebilirlik hedefleri duruyor.
            </p>
          </div>
          <a
            href={ciUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            CI workflows ↗
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {standards.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} index={index} className="h-full">
                <article className="surface-plain relative flex h-full flex-col p-5 sm:p-6">
                  <div className="relative flex items-start gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] border border-signal/25 bg-signal/[0.08] text-signal">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")} / {item.label}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="relative mt-4 break-words font-mono text-[0.7rem] leading-5 text-signal sm:text-xs">
                    $ checklist — {item.target}
                  </p>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
