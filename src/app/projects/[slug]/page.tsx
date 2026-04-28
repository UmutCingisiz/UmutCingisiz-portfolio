import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileProjectMDX } from "@/lib/mdx/compile";
import {
  getProjectMetaBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";

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

  return (
    <article className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <Link
        href="/projects"
        className="text-sm font-medium text-accent hover:underline"
      >
        ← Projeler
      </Link>
      <header className="mt-6 border-b border-border pb-8">
        <p className="font-mono text-sm text-accent">{frontmatter.category}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-muted-foreground">{frontmatter.description}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {new Date(frontmatter.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          {frontmatter.demo ? (
            <a
              href={frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline underline-offset-4"
            >
              Canlı demo ↗
            </a>
          ) : null}
          {frontmatter.repo ? (
            <a
              href={frontmatter.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline underline-offset-4"
            >
              Kaynak kod ↗
            </a>
          ) : null}
        </div>
      </header>
      <div className="prose prose-slate dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none py-10 [&_pre]:overflow-x-auto [&_figure]:!my-6">
        {content}
      </div>
    </article>
  );
}
