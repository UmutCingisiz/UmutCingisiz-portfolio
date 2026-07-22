import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Timeline } from "@/components/timeline";

const cards = [
  {
    eyebrow: "01 / systems thinking",
    title: "Sadece ekran değil, sistem kurarım",
    body: "Bir özelliği tasarlarken arayüz, veri modeli, hata durumu, güvenlik ve deploy sonrası bakım maliyetini birlikte düşünürüm.",
  },
  {
    eyebrow: "02 / engineering taste",
    title: "Kodun niyeti ilk bakışta anlaşılmalı",
    body: "TypeScript, Zod, küçük modüller ve net dosya sınırlarıyla kodu büyütmeden geliştirilebilir tutmaya çalışırım.",
  },
  {
    eyebrow: "03 / product delivery",
    title: "Demo değil, sunulabilir ürün hedeflerim",
    body: "SEO, erişilebilirlik, performans, ölçümleme ve ortam değişkenleri gibi detayları projeyi ciddiye aldığımı gösteren kanıtlar olarak görürüm.",
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="ambient-orb -right-24 top-10 size-72 opacity-25" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionEyebrow>about.engineer</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Bilgisayar mühendisi. TÜBİTAK ödüllü ürün. Full-stack sistemler.
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
              {siteConfig.shortBio} {siteConfig.location}
              {" merkezli çalışıyorum; yeni full-stack mühendislik rollerine açığım."}
            </p>
            <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground">
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
                    className="rounded-[var(--radius-sm)] border border-border bg-muted/50 px-3 py-2 text-sm text-foreground/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {cards.map((card, index) => (
              <Reveal key={card.title} index={index}>
                <article className="surface-card group relative p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {card.eyebrow}
                  </p>
                  <h3 className="relative mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Deneyim ve liderlik
          </h3>
          <Timeline items={siteConfig.milestones} />
        </div>
      </div>
    </section>
  );
}
