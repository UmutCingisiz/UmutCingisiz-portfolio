import { siteConfig } from "@/lib/site-config";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Spotlight } from "@/components/spotlight";

const skillCards = [
  {
    title: "Full-Stack Ürün Geliştirme",
    level: "Güçlü olduğum alan",
    body: "React, Next.js, TypeScript, Auth.js, Drizzle ve PostgreSQL ile uçtan uca ürün omurgası kuruyorum.",
    signal: "product-grade",
    visual: ["Next", "Auth", "DB", "UI"],
  },
  {
    title: "Algoritmik Problem Çözme",
    level: "Güçlü olduğum alan",
    body: "C, Java ve Python altyapısı; veri yapıları, rota mantığı ve karar algoritmalarını daha sağlam düşünmemi sağlıyor.",
    signal: "C / Java / Python",
    visual: ["O(n)", "graph", "heap", "path"],
  },
  {
    title: "AI ve Otomasyon Sistemleri",
    level: "Geliştirmekte olduğum alan",
    body: "LLM destekli eğitim akışları, prompt güvenliği ve otomasyon senaryoları üzerinde ürün odaklı çalışıyorum.",
    signal: "AI workflow",
    visual: ["LLM", "guard", "flow", "eval"],
  },
  {
    title: "DevOps ve Observability",
    level: "Geliştirmekte olduğum alan",
    body: "CI, E2E smoke, structured log, rate-limit ve production servis kurulumlarını canlıya alma standardının parçası görüyorum.",
    signal: "deploy-ready",
    visual: ["CI", "E2E", "logs", "SLO"],
  },
] as const;

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-muted/20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="ambient-orb -left-20 top-20 size-64 opacity-30" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>stack.map()</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Yetenekler: neyi iyi yaptığım ve neyi büyüttüğüm net.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Progress bar yerine kullanım bağlamı: hangi teknolojiyle hangi
            problemi çözdüğümü ve hangi alanlarda derinleştiğimi gösteriyorum.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {skillCards.map((card) => (
            <Spotlight
              as="article"
              key={card.title}
              className="premium-card group rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20"
            >
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {card.level}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {card.body}
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-border bg-background/45 p-4 sm:w-52">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {card.signal}
                    </span>
                    <span className="signal-dot size-2" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {card.visual.map((item, index) => (
                      <span
                        key={item}
                        className="rounded-lg border border-border bg-muted/45 px-2 py-2 text-center font-mono text-[0.68rem] text-foreground/85 transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{ transitionDelay: `${index * 40}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Spotlight>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {siteConfig.skills.map(({ tier, items }) => (
            <div key={tier} className="rounded-2xl border border-border bg-card/45 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm font-semibold text-foreground">{tier}</h3>
                <span className="rounded-lg border border-border bg-muted/60 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-xl border border-border bg-muted/35 p-3 transition-colors hover:border-foreground/20"
                  >
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
