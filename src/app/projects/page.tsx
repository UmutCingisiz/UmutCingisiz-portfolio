import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  filterProjectsByCategory,
  type ProjectMeta,
} from "@/lib/content/projects";
import type { ProjectCategory } from "@/lib/content/schema";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Seçilmiş projeler — amaç, teknoloji ve teknik kararlar MDX ile.",
};

const categories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "Tümü" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "full-stack", label: "Full-Stack" },
  { id: "devops", label: "DevOps" },
];

function parseCategory(raw: string | undefined): ProjectCategory | "all" {
  if (!raw || raw === "all") return "all";
  const ok = categories.some((c) => c.id === raw && c.id !== "all");
  return ok ? (raw as ProjectCategory) : "all";
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const category = parseCategory(sp.category);
  const projects = filterProjectsByCategory(category);

  const liveProjects = projects.filter(
    (p) => p.status === "live" || p.status === "archived" || !p.status
  );

  const inProgressProjects = projects.filter(
    (p) => p.status === "in-progress" || p.status === "planned" || p.status === "learning"
  );

  return (
    <div className="mx-auto max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        project.archive
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Projeler: sadece sonuç değil, mühendislik kararları.
      </h1>
      <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
        Bu sayfa, CV&apos;de tek satıra sığmayan kanıtları taşır: problem, stack,
        karar, trade-off ve canlı/kaynak bağlantıları.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const href =
            c.id === "all" ? "/projects" : `/projects?category=${c.id}`;
          const active = category === c.id;
          return (
            <Link
              key={c.id}
              href={href}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/20 hover:bg-muted hover:text-foreground"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {liveProjects.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground border-b border-border pb-4">
            Yayında Olanlar
          </h2>
          <ul className="grid gap-6 lg:grid-cols-2">
            {liveProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </ul>
        </section>
      )}

      {inProgressProjects.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground border-b border-border pb-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            Laboratuvar (Üzerinde Çalıştıklarım)
          </h2>
          <ul className="grid gap-6 lg:grid-cols-2 opacity-90">
            {inProgressProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </ul>
        </section>
      )}

      {projects.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          Bu kategoride henüz proje yok.
        </p>
      ) : null}

      <Link
        href="/"
        className="mt-12 inline-block text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Ana sayfa
      </Link>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectMeta }) {
  const coverImage = project.coverImage as string | undefined;

  return (
    <li className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg flex flex-col h-full">
      <div className="absolute -right-16 -top-16 size-40 rounded-full bg-foreground/[0.03] blur-3xl transition-all duration-500 group-hover:bg-foreground/[0.06]" />

      {/* GÖRSEL ALANI (Eğer MDX'te tanımlıysa render edilecek) */}
      {coverImage && (
        <div className="relative -mx-6 -mt-6 mb-6 h-56 overflow-hidden border-b border-border bg-muted">
          <Image
            src={coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {project.category}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
            <Link href={`/projects/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </h2>
        </div>
        <div className="hidden size-12 items-center justify-center rounded-xl border border-border bg-muted/50 font-mono text-sm font-semibold text-foreground sm:flex shrink-0">
          {String(project.category).slice(0, 2).toUpperCase()}
        </div>
      </div>
      <p className="relative mt-3 text-sm leading-7 text-muted-foreground flex-1">
        {project.description}
      </p>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
        {project.problem ? (
          <div className="rounded-lg border border-border bg-muted/35 p-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              problem
            </p>
            <p className="mt-1.5 text-sm leading-6 text-foreground/85 line-clamp-3">
              {project.problem}
            </p>
          </div>
        ) : null}
        {project.decision ? (
          <div className="rounded-lg border border-border bg-muted/35 p-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              decision
            </p>
            <p className="mt-1.5 text-sm leading-6 text-foreground/85 line-clamp-3">
              {project.decision}
            </p>
          </div>
        ) : null}
      </div>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.status ? (
          <span className="rounded-md border border-border bg-foreground px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-background">
            {project.status}
          </span>
        ) : null}
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="relative mt-6 flex flex-wrap gap-2">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex h-10 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-all duration-200 hover:opacity-90"
        >
          İncele →
        </Link>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
          >
            Demo ↗
          </a>
        ) : null}
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
          >
            Kod ↗
          </a>
        ) : null}
      </div>
    </li>
  );
}