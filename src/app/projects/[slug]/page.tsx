import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileProjectMDX } from "@/lib/mdx/compile";
import {
  getAdjacentProjects,
  getProjectMetaBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";
import { ArchitectureBlock } from "@/components/architecture-block";
import { ContactLink } from "@/components/contact-link";
import { JsonLd } from "@/components/json-ld";
import { ProjectGallery } from "@/components/project-gallery";
import { projectCreativeWorkJsonLd } from "@/lib/json-ld";
import { pageCanonical } from "@/lib/site-metadata";
import {
  getProjectStatusBadgeClass,
  getProjectStatusLabel,
} from "@/lib/project-status";
import { canonicalFor } from "@/lib/site-url";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getProjectMetaBySlug(slug);
  if (!meta) return {};
  const url = canonicalFor(`/projects/${slug}`);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    ...pageCanonical(`/projects/${slug}`),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const meta = getProjectMetaBySlug(slug);
  if (!meta) notFound();

  const compiled = await compileProjectMDX(slug);
  if (!compiled) notFound();

  const { content, frontmatter } = compiled;
  const { prev, next } = getAdjacentProjects(slug);
  const decisionCards = [
    {
      label: "Problem",
      title: "Çözülen problem",
      body: frontmatter.problem,
    },
    {
      label: "Karar",
      title: "Mühendislik kararı",
      body: frontmatter.decision,
    },
    {
      label: "Etki",
      title: "Kanıtlanan etki",
      body: frontmatter.impact,
    },
  ];

  return (
    <article className="mx-auto max-w-5xl flex-1 px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-6">
      <JsonLd
        data={projectCreativeWorkJsonLd({
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          date: frontmatter.date,
          tags: frontmatter.tags,
          repo: frontmatter.repo,
          demo: frontmatter.demo,
        })}
      />

      <div className="sticky top-[4.75rem] z-30 -mx-4 mb-6 border-b border-border/70 bg-background/90 px-4 py-3 backdrop-blur-md sm:top-[5.25rem] sm:-mx-6 sm:px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3.5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-signal/35 hover:bg-muted"
        >
          <span aria-hidden>←</span>
          Projelere Dön
        </Link>
      </div>

      <header className="overflow-hidden rounded-xl border border-border bg-card/60 p-7 backdrop-blur-sm sm:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {frontmatter.category} / case.study
          </p>
          <span
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] tracking-wide ${getProjectStatusBadgeClass(frontmatter.status)}`}
          >
            {getProjectStatusLabel(frontmatter.status)}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          {frontmatter.description}
        </p>
        {frontmatter.architectureLabel && frontmatter.architectureSummary ? (
          <div className="mt-5 max-w-2xl">
            <ArchitectureBlock
              label={frontmatter.architectureLabel}
              summary={frontmatter.architectureSummary}
            />
          </div>
        ) : null}
        <p className="mt-5 font-mono text-xs text-muted-foreground">
          {new Date(frontmatter.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          {frontmatter.repo ? (
            <a
              href={frontmatter.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            >
              Kaynak kod ↗
            </a>
          ) : null}
          {frontmatter.demo ? (
            <a
              href={frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-signal/30 bg-signal/10 px-4 py-2 text-sm font-medium text-signal transition-all duration-200 hover:bg-signal/15"
            >
              Canlı site ↗
            </a>
          ) : null}
        </div>
      </header>

      <ProjectGallery title={frontmatter.title} items={frontmatter.gallery} />

      <section className="mt-12 border-t border-border pt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              architecture.decisions
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Problem → karar → etki
            </h2>
          </div>
          <span className="w-fit font-mono text-[0.65rem] tracking-wide text-muted-foreground">
            {getProjectStatusLabel(frontmatter.status)}
          </span>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
          {decisionCards.map((card) => (
            <article key={card.label} className="min-w-0">
              <p className="font-mono text-[0.65rem] tracking-wide text-signal/80">
                {card.label}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="prose prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none py-10 prose-headings:tracking-tight prose-a:text-foreground prose-a:underline [&_pre]:overflow-x-auto [&_figure]:!my-6">
        {content}
      </div>

      <nav
        aria-label="Komşu projeler"
        className="mt-2 space-y-4 border-t border-border pt-10"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group inline-flex max-w-full items-baseline gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden>←</span>
            <span className="truncate group-hover:text-signal">{prev.title}</span>
          </Link>
        ) : null}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-signal/35 bg-gradient-to-br from-signal/[0.12] via-card/80 to-card/40 p-6 transition-all duration-200 hover:border-signal/55 hover:shadow-[0_0_40px_var(--signal-glow)] sm:p-8"
          >
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-signal">
              next.up
            </p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              Sıradaki proje
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {next.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground line-clamp-2">
              {next.description}
            </p>
            <span className="btn-signal mt-6 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold">
              İncele
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ) : null}
      </nav>

      <section className="mt-10 border-t border-border pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Bu proje hakkında yazın
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
          Mimari kararlar, stack seçimleri veya işbirliği için kısa bir mesaj
          yeterli.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ContactLink className="btn-signal inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold">
            İletişime geç
          </ContactLink>
          <Link
            href="/projects"
            className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Tüm projeler
          </Link>
        </div>
      </section>
    </article>
  );
}
