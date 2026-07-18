import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const highlights = [
  {
    title: "Ürün gibi çalışan portfolyo",
    body: "Sadece statik sayfa değil; auth, DB, cache, analytics, iletişim ve içerik katmanı olan deploy edilebilir bir sistem.",
    signal: "Proof / Product",
  },
  {
    title: "İşe alımda okunabilir kanıt",
    body: "Her bölüm teknik kararları görünür kılar: ne yaptım, neden böyle yaptım, hangi riski azalttım.",
    signal: "Career / Signal",
  },
  {
    title: "Minimal, net, profesyonel kimlik",
    body: "Koyu ve açık tema, temiz tipografi ve net kontrastla ciddi bir mühendislik vitrini.",
    signal: "Design / Craft",
  },
] as const;

export function EngineeringHighlights() {
  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {highlights.map((item, idx) => (
          <Reveal key={item.title} index={idx} className="h-full">
            <TiltCard
              as="article"
              max={6}
              className="premium-card gradient-border group relative h-full overflow-hidden rounded-2xl p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-signal/[0.05] blur-2xl transition-all duration-500 group-hover:bg-signal/[0.12]" />
              <p className="relative font-mono text-xs text-muted-foreground">
                0{idx + 1} / {item.signal}
              </p>
              <h2 className="relative mt-5 text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
                {item.body}
              </p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
