import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllProjectsMeta, type ProjectMeta } from "@/lib/content/projects";
import { Magnetic } from "@/components/magnetic";
import { PdiBlock } from "@/components/pdi-block";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Seçilmiş full-stack projeler — amaç, teknoloji ve teknik kararlar MDX ile.",
};

export default async function ProjectsPage() {
  const projects = getAllProjectsMeta();
  const liveCount = projects.filter(
    (p) => p.status === "live" || p.status === "archived",
  ).length;
  const labCount = projects.length - liveCount;

  return (
    <div className="relative flex-1 overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div className="ambient-orb right-0 top-20 size-80 opacity-35" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <SectionEyebrow>project.archive</SectionEyebrow>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-[-0.05em] text-foreground sm:text-6xl">
              Projeler, CV satırı değil; karar ve etki kanıtı.
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
              Hepsi uçtan uca <span className="font-medium text-foreground">full-stack</span>{" "}
              işler. Her proje; problem, mühendislik kararı ve ölçülebilir etki
              üzerinden okunur.
            </p>
          </div>

          <TiltCard as="div" max={5} className="premium-card gradient-border rounded-2xl p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              review.mode
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-background/45 p-3">
                <p className="text-2xl font-bold text-foreground">{liveCount}</p>
                <p className="mt-1 text-xs text-muted-foreground">yayında</p>
              </div>
              <div className="rounded-xl border border-border bg-background/45 p-3">
                <p className="text-2xl font-bold text-foreground">{labCount}</p>
                <p className="mt-1 text-xs text-muted-foreground">lab</p>
              </div>
              <div className="rounded-xl border border-signal/25 bg-signal/[0.06] p-3">
                <p className="text-2xl font-bold text-signal">P/D/I</p>
                <p className="mt-1 text-xs text-muted-foreground">şablon</p>
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.slug} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 ? (
          <p className="mt-12 text-muted-foreground">Henüz proje eklenmedi.</p>
        ) : null}

        <Link
          href="/"
          className="mt-16 inline-block text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
        >
          ← Ana sayfa
        </Link>
      </div>
    </div>
  );
}

function initials(title: string): string {
  return title
    .replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ ]/gu, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ProjectVisual({ project }: { project: ProjectMeta }) {
  const coverImage = project.coverImage as string | undefined;

  if (coverImage) {
    return (
      <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-muted">
        <Image
          src={coverImage}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 560px, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-muted to-card p-8">
      <div
        className="ambient-orb -right-10 -top-10 size-56 opacity-40"
        style={{ background: "radial-gradient(circle, var(--signal-glow), transparent 65%)" }}
      />
      <div className="bento-dots pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_70%_30%,black,transparent_70%)]" />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {project.slug}
        </span>
        <span className="signal-dot size-2" />
      </div>
      <div className="relative flex items-center gap-4">
        <span className="text-7xl font-black tracking-tighter text-gradient-premium">
          {initials(project.title)}
        </span>
        <span className="font-mono text-2xl text-signal">{"</>"}</span>
      </div>
      <div className="relative flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-background/50 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectShowcase({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const isLive = project.status === "live" || project.status === "archived";
  const flip = index % 2 === 1;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <TiltCard
        as="div"
        max={6}
        className={`rounded-3xl ${flip ? "lg:order-2" : "lg:order-1"}`}
      >
        <Link href={`/projects/${project.slug}`} aria-label={project.title}>
          <ProjectVisual project={project} />
        </Link>
      </TiltCard>

      <div className={flip ? "lg:order-1" : "lg:order-2"}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/25 bg-signal/[0.07] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-signal">
            <span className="signal-dot size-1.5" /> full-stack
          </span>
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] ${
              isLive
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-500 dark:text-emerald-300"
                : "border-amber-400/30 bg-amber-400/10 text-amber-600 dark:text-amber-200"
            }`}
          >
            {isLive ? "yayında" : "geliştiriliyor"}
          </span>
        </div>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <Link href={`/projects/${project.slug}`} className="hover:text-signal">
            {project.title}
          </Link>
        </h2>

        <p className="mt-4 text-pretty leading-8 text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-6 grid gap-3">
          {project.problem ? <PdiBlock signal="problem" text={project.problem} /> : null}
          {project.decision ? <PdiBlock signal="decision" text={project.decision} /> : null}
          {project.impact ? <PdiBlock signal="impact" text={project.impact} /> : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Magnetic>
            <Link
              href={`/projects/${project.slug}`}
              className="btn-signal inline-flex h-11 items-center rounded-lg px-5 text-sm font-semibold transition-all duration-200"
            >
              İncele →
            </Link>
          </Magnetic>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              Demo ↗
            </a>
          ) : null}
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              Kod ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
