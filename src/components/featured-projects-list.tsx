import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content/projects";
import { PdiBlock } from "@/components/pdi-block";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import {
  getProjectCategoryLabel,
  getProjectStatusBadgeClass,
  getProjectStatusLabel,
} from "@/lib/project-status";

type Props = {
  projects: ProjectMeta[];
};

function coverFor(p: ProjectMeta) {
  return p.coverImage ?? p.gallery?.[0]?.src ?? null;
}

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
              Seçilmiş projeler
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Her kartta problem, aldığım teknik karar ve ortaya çıkan etki var.
              Detay ve ekran görüntüleri için projeyi açın.
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
            Öne çıkan projeler yakında.{" "}
            <Link
              href="/projects"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Tüm projelere göz at
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const cover = coverFor(p);
              return (
                <li key={p.slug} className="min-w-0">
                  <Reveal index={i} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="relative block aspect-[4/3] w-full overflow-hidden bg-muted sm:aspect-[16/10]"
                        aria-label={`${p.title} görseli`}
                      >
                        {cover ? (
                          <Image
                            src={cover}
                            alt={p.gallery?.[0]?.alt ?? p.title}
                            fill
                            sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 92vw"
                            className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02] sm:object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
                            {p.title}
                          </div>
                        )}
                      </Link>

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 font-mono text-[0.65rem] font-medium tracking-wide text-foreground">
                            {getProjectCategoryLabel(p.category)}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 font-mono text-[0.65rem] tracking-wide ${getProjectStatusBadgeClass(p.status)}`}
                          >
                            {getProjectStatusLabel(p.status)}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="hover:text-signal"
                          >
                            {p.title}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                          {p.description}
                        </p>

                        <div className="mt-4 grid gap-2.5">
                          {p.problem ? (
                            <PdiBlock signal="problem" text={p.problem} />
                          ) : null}
                          {p.decision ? (
                            <PdiBlock signal="decision" text={p.decision} />
                          ) : null}
                          {p.impact ? (
                            <PdiBlock signal="impact" text={p.impact} />
                          ) : null}
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="btn-signal inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-semibold transition-all duration-200"
                          >
                            İncele →
                          </Link>
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
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
