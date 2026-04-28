import Link from "next/link";
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

  return (
    <div className="mx-auto max-w-5xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Projeler
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        Kartlar MDX frontmatter bilgisinden gelir; detay sayfasında mimari ve kod
        örnekleri bulunur.
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
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </ul>

      {projects.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          Bu kategoride henüz proje yok.
        </p>
      ) : null}

      <Link
        href="/"
        className="mt-12 inline-block text-sm font-medium text-accent hover:underline"
      >
        Ana sayfa
      </Link>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <li className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-accent/40">
      <p className="font-mono text-xs uppercase tracking-wide text-accent">
        {project.category}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-foreground">
        <Link href={`/projects/${project.slug}`} className="hover:underline">
          {project.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
      >
        Detay
      </Link>
    </li>
  );
}
