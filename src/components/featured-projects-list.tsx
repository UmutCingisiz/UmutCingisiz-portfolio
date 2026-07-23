import Image from "next/image";
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
                    <TiltCard
                      as="article"
                      max={4}
                      className="surface-interactive gradient-border group flex h-full flex-col overflow-hidden"
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        className="relative block aspect-[16/10] w-full overflow-hidden bg-muted"
                        aria-label={`${p.title} görseli`}
                      >
                        {cover ? (
                          <Image
                            src={cover}
                            alt={p.gallery?.[0]?.alt ?? p.title}
                            fill
                            sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 92vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] group-active:scale-[1.02]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">
                            {p.title}
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                      </Link>

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
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
                      </div>
                    </TiltCard>
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
