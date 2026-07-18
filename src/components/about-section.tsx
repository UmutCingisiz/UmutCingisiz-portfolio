import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

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
      className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionEyebrow>about.engineer</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hakkımda kısmı bir biyografi değil; nasıl mühendislik yaptığımın
              kanıtı.
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
              {siteConfig.description}
            </p>

            <div className="mt-8 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                proof_of_work
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {siteConfig.proofPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground/80"
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
              <TiltCard
                as="article"
                max={5}
                className="premium-card gradient-border group relative overflow-hidden rounded-2xl p-6"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 size-28 rounded-full bg-signal/[0.05] blur-2xl transition-all duration-500 group-hover:bg-signal/[0.12]" />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {card.eyebrow}
                </p>
                <h3 className="relative mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
                  {card.body}
                </p>
              </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
