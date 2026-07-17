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

  const liveProjects = projects.filter((p) => p.status === "live" || p.status === "archived");

  const inProgressProjects = projects.filter(
    (p) => p.status === "in-progress" || p.status === "planned" || p.status === "learning"
  );

  return (
    <div className="relative flex-1 overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div className="ambient-orb right-0 top-20 size-80 opacity-35" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              project.archive
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-[-0.05em] text-foreground sm:text-6xl">
              Projeler, CV satırı değil; karar ve etki kanıtı.
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
              Yayında olan ürünler ve laboratuvarda gelişen işler ayrı okunur.
              Her kart problem, karar, trade-off ve impact sinyaliyle tasarlandı.
            </p>
          </div>

          <div className="premium-card rounded-2xl p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              review.mode
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-background/45 p-3">
                <p className="text-2xl font-bold text-foreground">{liveProjects.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">yayında</p>
              </div>
              <div className="rounded-xl border border-border bg-background/45 p-3">
                <p className="text-2xl font-bold text-foreground">{inProgressProjects.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">lab</p>
              </div>
              <div className="rounded-xl border border-border bg-background/45 p-3">
                <p className="text-2xl font-bold text-foreground">P/D/I</p>
                <p className="mt-1 text-xs text-muted-foreground">şablon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => {
            const href =
              c.id === "all" ? "/projects" : `/projects?category=${c.id}`;
            const active = category === c.id;
            return (
              <Link
                key={c.id}
                href={href}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card/45 text-muted-foreground hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        {liveProjects.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                  shipped.work
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  Yayında olanlar
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                İnceleyen kişinin önce bakması gereken, kanıt değeri en yüksek ürünler.
              </p>
            </div>
            <ul className="grid gap-6 lg:grid-cols-2">
              {liveProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} variant="live" />
              ))}
            </ul>
          </section>
        )}

        {inProgressProjects.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
                  build.lab
                </p>
                <h2 className="mt-2 flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground">
                  <span className="relative flex size-3">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-300 opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-amber-300" />
                  </span>
                  Üzerinde çalıştıklarım
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Henüz final vitrine alınmamış ama mimari niyeti ve gelişim yönü net işler.
              </p>
            </div>
            <ul className="grid gap-6 lg:grid-cols-2">
              {inProgressProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} variant="lab" />
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
    </div>
  );
}

function ProjectCard({
  project,
  variant,
}: {
  project: ProjectMeta;
  variant: "live" | "lab";
}) {
  const coverImage = project.coverImage as string | undefined;
  const statusLabel = variant === "live" ? "yayında" : "geliştiriliyor";

  return (
    <li className="premium-card group flex h-full flex-col rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20">
      <div className="absolute -right-16 -top-16 size-48 rounded-full bg-foreground/[0.04] blur-3xl transition-all duration-500 group-hover:bg-foreground/[0.08]" />

      {coverImage && (
        <div className="relative -mx-6 -mt-6 mb-6 h-60 overflow-hidden border-b border-border bg-muted">
          <Image
            src={coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
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
        <span
          className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] ${
            variant === "live"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              : "border-amber-300/30 bg-amber-300/10 text-amber-200"
          }`}
        >
          {statusLabel}
        </span>
      </div>
      <p className="relative mt-3 text-sm leading-7 text-muted-foreground flex-1">
        {project.description}
      </p>

      <div className="relative mt-5 grid gap-3">
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
        {project.impact ? (
          <div className="rounded-lg border border-foreground/15 bg-foreground/[0.04] p-3">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              impact
            </p>
            <p className="mt-1.5 text-sm leading-6 text-foreground/85 line-clamp-3">
              {project.impact}
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