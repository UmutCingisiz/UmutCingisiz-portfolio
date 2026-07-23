import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Timeline } from "@/components/timeline";

const cards = [
  {
    eyebrow: "01 · Sistem",
    title: "Sadece arayüze değil, uçtan uca ölçeklenebilir sistemler kurmayı hedefliyorum.",
    body: "Bir ekranı çizerken veri modelini, hata yolunu ve güvenlik sınırını birlikte düşünürüm.",
  },
  {
    eyebrow: "02 · Zanaat",
    title: "Kod her zaman temiz yapıda ve okunabilir olmalı.",
    body: "Kullandığım teknolojilerin net modül sınırlarıyla büyüyen projeyi takip edilebilir tutarak kodun okunabilirliğini sağlarım.",
  },
  {
    eyebrow: "03 · Yayın",
    title: "Sistemi sadece kurmak değil, güncellenebilir bir şekilde yönetmeyi hedefliyorum.",
    body: "Sistemi güncellemek için sadece kodu değiştirmek yeterli değil, sistemin durumunu takip etmek ve güncellemeleri yapmak gerekiyor. Bu yüzden sistemimizi güncelleyebilir ve yönetebilir hale getirmek için gerekli olan araçları ve süreçleri dikkatli bir şekilde planlayarak sağlarım.",
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
            Deneyim
          </h3>
          <Timeline items={siteConfig.milestones} />
        </div>
      </div>
    </section>
  );
}
