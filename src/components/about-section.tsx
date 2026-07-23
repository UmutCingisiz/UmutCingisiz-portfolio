import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Timeline } from "@/components/timeline";

const cards = [
  {
    eyebrow: "01 / systems",
    title: "Özellik değil, sistem kurarım",
    body: "Bir ekranı çizerken veri modelini, hata yolunu, güvenlik sınırını ve deploy sonrası bakım maliyetini aynı anda düşünürüm. Bloomedu’dan kurumsal web’e kadar bu alışkanlık aynı.",
  },
  {
    eyebrow: "02 / craft",
    title: "Kodun niyeti okunabilir olmalı",
    body: "TypeScript, Zod ve net modül sınırlarıyla büyüyen projeyi kontrol altında tutarım. Okunabilirlik, hızdan ödün vermeden sürdürülebilirlik demektir.",
  },
  {
    eyebrow: "03 / ship",
    title: "Demo değil, yayınlanabilir ürün",
    body: "SEO, form güvenliği, performans ve dürüst durum etiketleri — bunları süs değil, ürünün çalıştığının kanıtı olarak görürüm.",
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden scroll-mt-24 px-4 py-14 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <div>
            <SectionEyebrow>about.engineer</SectionEyebrow>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Bilgisayar mühendisi. Ürün düşünen full-stack geliştirici.
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
              {siteConfig.shortBio}
            </p>
            <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground">
              {siteConfig.location} merkezli çalışıyorum.{" "}
              {siteConfig.description}
            </p>

            <div className="surface-plain mt-8 p-5 backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                üretim kanıtları
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {siteConfig.proofPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-2.5 text-sm leading-snug text-foreground/85"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {cards.map((card, index) => (
              <Reveal key={card.title} index={index}>
                <article className="surface-card group relative p-5 sm:p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {card.eyebrow}
                  </p>
                  <h3 className="relative mt-3 text-lg font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-7 text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-12 sm:mt-16 sm:pt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Deneyim ve yolculuk
          </h3>
          <Timeline items={siteConfig.milestones} />
        </div>
      </div>
    </section>
  );
}
