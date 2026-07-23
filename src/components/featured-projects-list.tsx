import Link from "next/link";
import type { ProjectMeta } from "@/lib/content/projects";
import { Magnetic } from "@/components/magnetic";
import { PdiBlock } from "@/components/pdi-block";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";
import {
  getProjectStatusBadgeClass,
  getProjectStatusLabel,
} from "@/lib/project-status";

type Props = {
  projects: ProjectMeta[];
};

export function FeaturedProjectsList({ projects }: Props) {
  return (
    <section
      id="projects"
      className="relative scroll-mt-28 overflow-hidden px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>selected.case_studies</SectionEyebrow>
            <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Seçilmiş vaka çalışmaları — problem, karar, etki.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Her kart bir ürün hikâyesi: neyi çözdüm, neden o mimariyi seçtim, sonuç ne oldu.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted sm:h-10 sm:px-4"
          >
            Tümünü gör
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            Öne çıkan case study&apos;ler yakında.{" "}
            <Link
              href="/projects"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Tüm projelere göz at
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Reveal index={i} className="h-full">
                  <TiltCard
                    as="article"
                    max={5}
                    className="surface-interactive gradient-border group flex h-full flex-col p-4 sm:p-5"
                  >
                    <div className="relative flex items-start justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/25 bg-signal/[0.07] px-2.5 py-1 font-mono text-[0.65rem] font-medium tracking-wide text-signal">
                        <span className="signal-dot size-1.5" aria-hidden />
                        Full-stack
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[0.65rem] tracking-wide ${getProjectStatusBadgeClass(p.status)}`}
                      >
                        {getProjectStatusLabel(p.status)}
                      </span>
                    </div>

                    <h3 className="relative mt-4 text-lg font-semibold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="relative mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {p.description}
                    </p>

                    <div className="relative mt-4 grid gap-3">
                      {p.problem ? <PdiBlock signal="problem" text={p.problem} /> : null}
                      {p.decision ? <PdiBlock signal="decision" text={p.decision} /> : null}
                      {p.impact ? <PdiBlock signal="impact" text={p.impact} /> : null}
                    </div>

                    <div className="relative mt-4 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-5 flex flex-wrap gap-2 pt-1">
                      <Magnetic>
                        <Link
                          href={`/projects/${p.slug}`}
                          className="btn-signal inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-semibold transition-all duration-200"
                        >
                          İncele →
                        </Link>
                      </Magnetic>
                      {p.repo ? (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center rounded-lg border border-border px-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
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
