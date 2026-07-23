import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Timeline } from "@/components/timeline";

const cards = [
  {
    eyebrow: "01 · Sistem",
    title: "Özellik değil, sistem kurarım",
    body: "Bir ekranı çizerken veri modeli, hata yolu ve güvenlik sınırını aynı anda düşünürüm.",
  },
  {
    eyebrow: "02 · Zanaat",
    title: "Kodun niyeti okunabilir olmalı",
    body: "TypeScript, Zod ve net modül sınırlarıyla büyüyen projeyi kontrol altında tutarım.",
  },
  {
    eyebrow: "03 · Yayın",
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
              Nasıl mühendislik yapıyorum
            </h2>
            <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
              {siteConfig.description}
            </p>
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
