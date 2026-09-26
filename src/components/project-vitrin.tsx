import Link from "next/link";
import type { ProjectMeta } from "@/lib/content/projects";
import { ProjectStage } from "@/components/project-stage";
import { splitProjectTitle } from "@/lib/project-cover";
import { getProjectStatusLabel, getProjectStatusTone } from "@/lib/project-status";

const STATUS_DOT = {
  live: "bg-emerald-500",
  building: "bg-amber-400",
  archived: "bg-muted-foreground/60",
} as const;

export function ProjectStatusMark({ status }: { status: ProjectMeta["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <span
        className={`size-1.5 rounded-full ${STATUS_DOT[getProjectStatusTone(status)]} ${
          getProjectStatusTone(status) === "live" ? "animate-pulse" : ""
        }`}
        aria-hidden
      />
      {getProjectStatusLabel(status)}
    </span>
  );
}

function MetaLine({ project }: { project: ProjectMeta }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
      {project.context ? (
        <span className="text-sm text-muted-foreground">{project.context}</span>
      ) : (
        <span />
      )}
      <ProjectStatusMark status={project.status} />
    </div>
  );
}

/** Seçilmiş ve geliştirilen işler: görsel üstte, bilgi altta, tek çerçeve. */
export function ProjectCard({ project }: { project: ProjectMeta }) {
  const { name, tagline } = splitProjectTitle(project.title);

  return (
    <article className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-none transition duration-500 ease-out hover:-translate-y-1.5 hover:border-foreground/30 hover:shadow-[var(--card-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <ProjectStage project={project} width="card" fill />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <MetaLine project={project} />
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-signal">
            {name}
          </h3>
          {tagline ? (
            <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">{tagline}</p>
          ) : null}
          {project.proof ? (
            <p className="mt-4 text-sm font-medium leading-6 text-foreground">{project.proof}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

/** Yayındaki iş: görsel ve metin aynı çerçevenin iki yanında. */
export function ProjectFeature({ project }: { project: ProjectMeta }) {
  const { name, tagline } = splitProjectTitle(project.title);

  return (
    <article>
      <Link
        href={`/projects/${project.slug}`}
        className="group grid overflow-hidden rounded-2xl border border-border bg-card shadow-none transition duration-500 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[var(--card-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[24rem]">
          <ProjectStage project={project} width="wide" fill />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <MetaLine project={project} />
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-signal">
            {name}
          </h3>
          {tagline ? (
            <p className="mt-2 text-base leading-7 text-muted-foreground">{tagline}</p>
          ) : null}
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
            {project.description}
          </p>
          {project.proof ? (
            <p className="mt-5 text-sm font-medium leading-6 text-foreground">{project.proof}</p>
          ) : null}
          {project.role ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.role}</p>
          ) : null}
          <span className="mt-6 text-sm font-medium text-foreground">
            İncele
            <span aria-hidden className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Ana sayfada seçilen üç işin dışındaki çalışmalar. */
export function ProjectIndexRow({ project }: { project: ProjectMeta }) {
  const { name } = splitProjectTitle(project.title);

  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col gap-2 py-4 transition duration-300 hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-2"
      >
        <span className="min-w-0">
          <span className="block font-medium text-foreground transition-colors group-hover:text-signal">
            {name}
          </span>
          {project.proof ? (
            <span className="mt-0.5 block truncate text-sm text-muted-foreground">{project.proof}</span>
          ) : null}
        </span>
        <span className="flex items-center gap-3">
          <ProjectStatusMark status={project.status} />
          <span
            aria-hidden
            className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
          >
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
