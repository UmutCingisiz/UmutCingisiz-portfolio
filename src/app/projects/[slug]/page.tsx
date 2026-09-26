import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileProjectMDX } from "@/lib/mdx/compile";
import {
  getAdjacentProjects,
  getProjectMetaBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";
import { ContactLink } from "@/components/contact-link";
import { JsonLd } from "@/components/json-ld";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectStatusMark } from "@/components/project-vitrin";
import { ProjectStage } from "@/components/project-stage";
import { projectCreativeWorkJsonLd } from "@/lib/json-ld";
import { pageCanonical } from "@/lib/site-metadata";
import { withSiteFooter } from "@/components/with-site-footer";
import { getProjectDevice } from "@/lib/project-cover";
import {
  getProjectCategoryLabel,
  getProjectImpactLabel,
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
  const meta = await getProjectMetaBySlug(slug);
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
  const meta = await getProjectMetaBySlug(slug);
  if (!meta) notFound();

  const compiled = await compileProjectMDX(slug);
  if (!compiled) notFound();

  const { content, frontmatter } = compiled;
  const { prev, next } = await getAdjacentProjects(slug);
  const impactLabel = getProjectImpactLabel(meta.status);
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
      label: impactLabel,
      title: impactLabel === "Etki" ? "Ortaya çıkan etki" : "Şu anki durum",
      body: frontmatter.impact,
    },
  ];
  const facts = [
    { label: "Rol", value: frontmatter.role },
    { label: "Bağlam", value: frontmatter.context },
    {
      label: "Mimari",
      value:
        frontmatter.architectureLabel && frontmatter.architectureSummary
          ? `${frontmatter.architectureLabel}. ${frontmatter.architectureSummary}`
          : frontmatter.architectureLabel,
    },
    {
      label: "Tarih",
      value: new Date(frontmatter.date).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
      }),
    },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return withSiteFooter(
    <article className="mx-auto max-w-6xl flex-1 px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-6">
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
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3.5 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:border-signal/35 hover:bg-muted"
        >
          <span aria-hidden>←</span>
          Projelere Dön
        </Link>
      </div>

      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide">
          <span className="text-muted-foreground">
            {getProjectCategoryLabel(frontmatter.category)} · case.study
          </span>
          <ProjectStatusMark status={meta.status} />
        </div>
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
          {frontmatter.description}
        </p>
        {frontmatter.proof ? (
          <p className="mt-4 font-medium text-signal">{frontmatter.proof}</p>
        ) : null}
      </header>

      <ProjectStage project={meta} width="hero" eager className="mt-8 sm:mt-10" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        <div className="min-w-0 lg:order-1">
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              architecture.decisions
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Problem → karar → etki
            </h2>
            <div className="mt-8 space-y-6">
              {decisionCards.map((card) => (
                <div key={card.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <div>
                    <p className="font-mono text-[0.65rem] tracking-wide text-signal/80">
                      {card.label}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-foreground">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <ProjectGallery
            title={frontmatter.title}
            items={frontmatter.gallery}
            device={getProjectDevice(meta)}
          />

          <div className="prose prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none py-10 prose-headings:tracking-tight prose-a:text-foreground prose-a:underline [&_pre]:overflow-x-auto [&_figure]:!my-6">
            {content}
          </div>
        </div>

        <aside className="lg:order-2">
          <div className="lg:sticky lg:top-40">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Künye
            </p>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {facts.map((fact) => (
                <div key={fact.label} className="py-3">
                  <dt className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-foreground">{fact.value}</dd>
                </div>
              ))}
              <div className="py-3">
                <dt className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                  Teknolojiler
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            {frontmatter.demo || frontmatter.repo ? (
              <div className="mt-5 flex flex-col gap-2">
                {frontmatter.demo ? (
                  <a
                    href={frontmatter.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-signal inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold"
                  >
                    {frontmatter.demoLabel ?? "Canlı site"} ↗
                  </a>
                ) : null}
                {frontmatter.repo ? (
                  <a
                    href={frontmatter.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                  >
                    Kaynak kod ↗
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>
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
            className="group relative grid overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground/20 sm:p-8 md:grid-cols-[1fr_16rem] md:items-center md:gap-8"
          >
            <div>
              <p className="font-mono text-[0.7rem] tracking-[0.18em] text-signal">
                next.up
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                Sıradaki proje
              </p>
              <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {next.title}
              </h2>
              <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-muted-foreground">
                {next.description}
              </p>
              <span className="btn-signal mt-6 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold">
                İncele
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
            <ProjectStage project={next} width="card" className="mt-6 hidden md:mt-0 md:block" />
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
    </article>,
  );
}
