import Link from "next/link";
import type { ProjectMeta } from "@/lib/content/projects";
import { Magnetic } from "@/components/magnetic";
import { PdiBlock } from "@/components/pdi-block";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

type Props = {
  projects: ProjectMeta[];
};

export function FeaturedProjectsList({ projects }: Props) {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="ambient-orb left-1/2 top-24 size-72 -translate-x-1/2 opacity-25" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>selected.case_studies</SectionEyebrow>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Vitrin değil, kararların ve sonuçların kanıt panosu.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Bu kartlar &ldquo;ne kullandım?&rdquo; listesinden daha fazlası: problem,
              mühendislik kararı, teknik risk ve sonuç hikayesini görünür kılar.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
          >
            Tümünü gör
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            Henüz öne çıkan proje yok. Bir MDX dosyasında{" "}
            <code className="font-mono text-sm">featured: true</code> kullan.
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Reveal index={i} className="h-full">
                  <TiltCard
                    as="article"
                    max={6}
                    className="premium-card gradient-border group flex h-full flex-col rounded-3xl p-6"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-signal/[0.05] blur-3xl transition-all duration-500 group-hover:bg-signal/[0.12]" />

                    <div className="relative flex items-start justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/[0.07] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-signal">
                        <span className="signal-dot size-1.5" aria-hidden />
                        full-stack
                      </span>
                      <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                        {p.status ?? "featured"}
                      </span>
                    </div>

                    <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">
                      <Link href={`/projects/${p.slug}`} className="hover:text-signal">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
                      {p.description}
                    </p>

                    <div className="relative mt-5 grid gap-3">
                      {p.problem ? <PdiBlock signal="problem" text={p.problem} /> : null}
                      {p.decision ? <PdiBlock signal="decision" text={p.decision} /> : null}
                      {p.impact ? <PdiBlock signal="impact" text={p.impact} /> : null}
                    </div>

                    <div className="relative mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-6 flex flex-wrap gap-2 pt-1">
                      <Magnetic>
                        <Link
                          href={`/projects/${p.slug}`}
                          className="btn-signal inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold transition-all duration-200"
                        >
                          İncele →
                        </Link>
                      </Magnetic>
                      {p.demo ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                        >
                          Demo ↗
                        </a>
                      ) : null}
                      {p.repo ? (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                        >
                          Kod ↗
                        </a>
                      ) : null}
                    </div>
                  </TiltCard>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
