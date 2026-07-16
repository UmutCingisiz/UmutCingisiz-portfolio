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
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <p className="font-mono text-xs text-muted-foreground">
              0{idx + 1} / {item.signal}
            </p>
            <h2 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
