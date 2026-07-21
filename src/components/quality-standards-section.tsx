import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

const standards = [
  {
    label: "performance",
    title: "Performans bütçesi",
    target: "LCP < 2.5s · CLS < 0.1 · INP < 200ms",
    body: "Hero görseli, server-first bölümler ve kontrollü animasyonlarla görsel kaliteyi hızdan ödün vermeden koruma hedefi.",
    icon: GaugeIcon,
  },
  {
    label: "accessibility",
    title: "Erişilebilirlik disiplini",
    target: "Keyboard flow · visible focus · semantic sections",
    body: "Skip link, doğru landmark akışı, yüksek kontrast ve sade kart hiyerarşisi ile portfolyo herkes için okunabilir kalmalı.",
    icon: A11yIcon,
  },
  {
    label: "security",
    title: "Güvenli etkileşimler",
    target: "OAuth · Zod · rate-limit · moderation",
    body: "Guestbook, view counter, resume ve contact akışları kötüye kullanım senaryoları düşünülerek tasarlanıyor.",
    icon: ShieldIcon,
  },
  {
    label: "observability",
    title: "Operasyonel görünürlük",
    target: "structured events · error logs · smoke tests",
    body: "Kritik kullanıcı olayları ve servis hataları structured log olarak izlenebilir; production sonrası teşhis kolaylaşır.",
    icon: RadarIcon,
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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12l5-5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function QualityStandardsSection() {
  return (
    <section className="relative overflow-hidden scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="ambient-orb -right-20 top-1/3 size-64 opacity-20 [animation-delay:3s]" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>quality.standards</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Güzel görünen değil, ölçülebilir şekilde güven veren portfolyo.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Bir bilgisayar mühendisi portfolyosu yalnızca UI göstermekle
            kalmamalı; performans, erişilebilirlik, güvenlik ve operasyon
            kalitesini de açıkça taşımalı.
          </p>
        </div>

        {/* Terminal/bento grid — geleneksel 01-02 listesi yerine ölçülebilir kart panosu */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {standards.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} index={index} className="h-full">
                <TiltCard
                  as="article"
                  max={5}
                  className="premium-card gradient-border group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-signal/[0.06] blur-2xl transition-opacity duration-500 group-hover:bg-signal/[0.12]" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-signal/25 bg-signal/[0.08] text-signal shadow-[0_0_24px_var(--signal-glow)]">
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
                  </div>

                  <p className="relative mt-4 font-mono text-[0.7rem] leading-5 text-signal sm:text-xs">
                    $ target — {item.target}
                  </p>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
