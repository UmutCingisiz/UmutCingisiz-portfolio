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
    <section className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            quality.standards
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Güzel görünen değil, ölçülebilir şekilde güven veren portfolyo.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Bir bilgisayar mühendisi portfolyosu yalnızca UI göstermekle
            kalmamalı; performans, erişilebilirlik, güvenlik ve operasyon
            kalitesini de açıkça taşımalı.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {standards.map((item) => (
            <article
              key={item.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/55 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
            >
              <div className="absolute -right-16 -top-16 size-40 rounded-full bg-foreground/[0.03] blur-3xl transition-all duration-500 group-hover:bg-foreground/[0.06]" />
              <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </p>
              <h3 className="relative mt-4 text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="relative mt-3 font-mono text-xs text-foreground/80">
                {item.target}
              </p>
              <p className="relative mt-4 text-sm leading-7 text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
