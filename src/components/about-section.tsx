import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Timeline } from "@/components/timeline";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/get-locale";
import { siteConfig } from "@/lib/site-config";

export async function AboutSection() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <section
      id="about"
      className="relative overflow-hidden scroll-mt-28 px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
          <div>
            <SectionEyebrow>{dictionary.about.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {dictionary.about.title}
            </h2>
            <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
              {dictionary.about.description}
            </p>
          </div>

          <div className="grid gap-3">
            {dictionary.about.cards.map((card, index) => (
              <Reveal key={card.title} index={index}>
                <article className="rounded-xl border border-border bg-card/70 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-border/80 hover:shadow-lg sm:p-5">
                  <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-10 sm:mt-14 sm:pt-12">
          <h3 className="font-mono text-[0.7rem] tracking-wide text-muted-foreground">
            {dictionary.about.experience}
          </h3>
          <Timeline items={siteConfig.milestones} />
        </div>
      </div>
    </section>
  );
}
