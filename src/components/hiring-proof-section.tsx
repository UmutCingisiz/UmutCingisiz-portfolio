import Link from "next/link";

const proofSignals = [
  {
    label: "architecture",
    title: "Uçtan uca ürün mimarisi",
    body: "App Router, Server Components, MDX, Auth.js, Drizzle, Neon ve Redis katmanları tek ürün içinde birlikte çalışıyor.",
    evidence: "Full-stack case study",
    href: "/projects/portfolio-web",
  },
  {
    label: "quality",
    title: "Kalite kapısı olan geliştirme",
    body: "Lint, typecheck, Vitest, build ve içerik doğrulama adımları portfolyonun bozulmadan büyümesini sağlıyor.",
    evidence: "CI + content validation",
    href: "/projects/portfolio-web",
  },
  {
    label: "security",
    title: "Güvenlik ve kötüye kullanım farkındalığı",
    body: "Guestbook ve contact akışlarında OAuth, moderasyon, Zod doğrulama, honeypot ve rate-limit yaklaşımı var.",
    evidence: "Auth + rate limit",
    href: "/blog/nextjs-server-actions-guvenlik",
  },
  {
    label: "delivery",
    title: "Yayınlanabilir deneyim",
    body: "SEO, OG görselleri, manifest, error/loading durumları, CV indirme ve production servis planı hazır.",
    evidence: "Deploy-ready workflow",
    href: "/#contact",
  },
] as const;

const proofMetrics = [
  { value: "3", label: "case-study proje" },
  { value: "3", label: "teknik blog yazısı" },
  { value: "16", label: "otomatik test" },
  { value: "5", label: "kalite komutu" },
] as const;

const reviewPath = [
  "60 saniyede hero + proof sinyalleri",
  "2 dakikada projelerde problem/decision/impact",
  "5 dakikada blog + GitHub + guestbook akışı",
] as const;

export function HiringProofSection() {
  return (
    <section className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              hiring.proof
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              İşe alım kararını hızlandıran teknik kanıtlar.
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground">
              Referans portfolyolardaki en güçlü ortak nokta netlik: ziyaretçi
              kim olduğunu, ne yaptığını ve neyi kanıtlayabildiğini hızlıca
              anlamalı. Bu bölüm, portfolyoyu CV metninden çıkarıp doğrulanabilir
              mühendislik sinyaline dönüştürür.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {proofMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-border bg-card/60 p-4"
                >
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-muted/35 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                reviewer_path
              </p>
              <ol className="mt-4 space-y-3">
                {reviewPath.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-foreground">
                      0{index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid gap-4">
            {proofSignals.map((signal) => (
              <article
                key={signal.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-card/55 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
              >
                <div className="absolute -right-16 -top-16 size-40 rounded-full bg-foreground/[0.03] blur-3xl transition-all duration-500 group-hover:bg-foreground/[0.06]" />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {signal.label}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                      {signal.title}
                    </h3>
                  </div>
                  <span className="w-fit rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                    {signal.evidence}
                  </span>
                </div>
                <p className="relative mt-4 text-sm leading-7 text-muted-foreground">
                  {signal.body}
                </p>
                <Link
                  href={signal.href}
                  className="relative mt-5 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Kanıtı incele →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
