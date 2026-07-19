import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

const standards = [
  {
    label: "performance",
    title: "Performans bütçesi",
    target: "LCP < 2.5s · CLS < 0.1 · INP < 200ms",
    body: "Hero görseli, server-first bölümler ve kontrollü animasyonlarla görsel kaliteyi hızdan ödün vermeden koruma hedefi.",
  },
  {
    label: "accessibility",
    title: "Erişilebilirlik disiplini",
    target: "Keyboard flow · visible focus · semantic sections",
    body: "Skip link, doğru landmark akışı, yüksek kontrast ve sade kart hiyerarşisi ile portfolyo herkes için okunabilir kalmalı.",
  },
  {
    label: "security",
    title: "Güvenli etkileşimler",
    target: "OAuth · Zod · rate-limit · moderation",
    body: "Guestbook, view counter, resume ve contact akışları kötüye kullanım senaryoları düşünülerek tasarlanıyor.",
  },
  {
    label: "observability",
    title: "Operasyonel görünürlük",
    target: "structured events · error logs · smoke tests",
    body: "Kritik kullanıcı olayları ve servis hataları structured log olarak izlenebilir; production sonrası teşhis kolaylaşır.",
  },
] as const;

export function QualityStandardsSection() {
  return (
    <section className="relative overflow-hidden scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="ambient-orb -right-20 top-1/3 size-64 opacity-20 [animation-delay:3s]" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Sol: yapışkan başlık */}
        <div className="lg:sticky lg:top-28 lg:self-start">
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

        {/* Sağ: kutu yerine bölmeli liste — daha ferah bir ritim */}
        <ul className="flex flex-col">
          {standards.map((item, index) => (
            <Reveal key={item.label} index={index}>
              <li className="group relative flex gap-5 border-t border-border py-7 first:border-t-0 first:pt-0">
                <span className="mt-0.5 font-mono text-sm tabular-nums text-signal/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-signal">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs text-signal">{item.target}</p>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
