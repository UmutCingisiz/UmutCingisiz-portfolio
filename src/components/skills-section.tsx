import { siteConfig } from "@/lib/site-config";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-y border-border bg-muted/30 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              stack.map()
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Yetenekler: seviyeli, dürüst ve bağlamlı.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Progress bar yerine gerçek kullanım bağlamı: hangi teknolojiyle ne
            çözdüğümü görünür kılmak daha değerli.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {siteConfig.skills.map(({ tier, items }) => (
            <div
              key={tier}
              className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-mono text-sm font-semibold text-foreground">
                  {tier}
                </h3>
                <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <ul className="mt-6 space-y-5">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="border-l-2 border-foreground/15 pl-4 transition-colors hover:border-foreground/40"
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
