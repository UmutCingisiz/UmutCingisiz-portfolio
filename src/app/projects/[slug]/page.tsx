import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileProjectMDX } from "@/lib/mdx/compile";
import {
  getProjectMetaBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";
import { ProjectGallery } from "@/components/project-gallery";

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
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const meta = getProjectMetaBySlug(slug);
  if (!meta) notFound();

  const compiled = await compileProjectMDX(slug);
  if (!compiled) notFound();

  const { content, frontmatter } = compiled;
  const decisionCards = [
    {
      label: "problem",
      title: "Çözülen problem",
      body: frontmatter.problem,
    },
    {
      label: "decision",
      title: "Mühendislik kararı",
      body: frontmatter.decision,
    },
    {
      label: "impact",
      title: "Kanıtlanan etki",
      body: frontmatter.impact,
    },
  ];

  const isLive = frontmatter.status === "live";

  return (
    <article className="mx-auto max-w-5xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/projects"
        className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
      >
        ← Projeler
      </Link>

      <header className="mt-8 overflow-hidden rounded-xl border border-border bg-card/60 p-7 backdrop-blur-sm sm:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {frontmatter.category} / case.study
          </p>
          <span
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] ${
              isLive
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-amber-400/30 bg-amber-400/10 text-amber-200"
            }`}
          >
            {isLive ? "yayında" : "geliştiriliyor"}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          {frontmatter.description}
        </p>
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

      <section className="mt-8 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              architecture.decisions
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Problem → karar → etki
            </h2>
          </div>
          <span className="w-fit rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
            {frontmatter.status}
          </span>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {decisionCards.map((card) => (
            <article
              key={card.label}
              className="rounded-lg border border-border bg-muted/35 p-4"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
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
    </article>
  );
}
