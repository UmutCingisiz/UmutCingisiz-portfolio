import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compilePostMDX } from "@/lib/mdx/compile";
import {
  getPostMetaBySlug,
  getPostSlugs,
} from "@/lib/content/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMetaBySlug(slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      publishedTime: meta.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const meta = getPostMetaBySlug(slug);
  if (!meta) notFound();

  const compiled = await compilePostMDX(slug);
  if (!compiled) notFound();

  const { content, frontmatter } = compiled;

  return (
    <article className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="text-sm font-medium text-accent hover:underline"
      >
        Blog
      </Link>
      <header className="mt-6 border-b border-border pb-8">
        <time
          dateTime={frontmatter.date}
          className="font-mono text-sm text-muted-foreground"
        >
          {new Date(frontmatter.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-muted-foreground">{frontmatter.description}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          ~{meta.readingMinutes} dk okuma · görüntülenme (yakında)
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </header>
      <div className="prose prose-slate dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none py-10 [&_pre]:overflow-x-auto [&_figure]:!my-6">
        {content}
      </div>
    </article>
  );
}
