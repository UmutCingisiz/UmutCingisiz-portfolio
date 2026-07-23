import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Timeline } from "@/components/timeline";

const cards = [
  {
    eyebrow: "01 · systems",
    title: "Özellik değil, sistem kurarım",
    body: "Ekranı çizerken veri modeli, hata yolu ve güvenlik sınırını birlikte düşünürüm.",
  },
  {
    eyebrow: "02 · craft",
    title: "Kodun niyeti okunabilir olmalı",
    body: "TypeScript, Zod ve net modül sınırlarıyla büyüyen projeyi kontrol altında tutarım.",
  },
  {
    eyebrow: "03 · ship",
    title: "Demo değil, yayınlanabilir ürün",
    body: "SEO, form güvenliği ve dürüst durum etiketleri — süs değil, kanıt.",
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden scroll-mt-28 px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
          <div>
            <SectionEyebrow>about.engineer</SectionEyebrow>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Bilgisayar mühendisi. Ürün düşünen full-stack geliştirici.
            </h2>
            <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
              {siteConfig.shortBio} {siteConfig.location} merkezli çalışıyorum.
            </p>

            <div className="surface-plain mt-6 p-4 sm:p-5">
              <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                Üretim kanıtları
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {siteConfig.proofPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-2 text-xs leading-snug text-foreground/85 sm:text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {cards.map((card, index) => (
              <Reveal key={card.title} index={index}>
                <article className="surface-card group relative p-4 sm:p-5">
                  <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                    {card.eyebrow}
                  </p>
                  <h3 className="relative mt-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {card.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12">
          <h3 className="font-mono text-[0.7rem] tracking-wide text-muted-foreground">
            Deneyim ve yolculuk
          </h3>
          <Timeline items={siteConfig.milestones} />
        </div>
      </div>
    </section>
  );
}
