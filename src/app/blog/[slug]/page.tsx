import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogViewTracker } from "@/components/blog/blog-view-tracker";
import { getBlogViews } from "@/lib/blog-views";
import { compilePostMDX } from "@/lib/mdx/compile";
import {
  getPostMetaBySlug,
  getPostSlugs,
} from "@/lib/content/posts";
import { pageCanonical } from "@/lib/site-metadata";

export const revalidate = 3600;

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
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    ...pageCanonical(`/blog/${slug}`),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const meta = getPostMetaBySlug(slug);
  if (!meta) notFound();

  const compiled = await compilePostMDX(slug);
  if (!compiled) notFound();

  const { content, frontmatter } = compiled;
  const views = await getBlogViews(slug);

  return (
    <article className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/blog"
        className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
      >
        ← Blog
      </Link>
      <header className="mt-8 rounded-xl border border-border bg-card/60 p-7 backdrop-blur-sm">
        <time
          dateTime={frontmatter.date}
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          {new Date(frontmatter.date).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          {frontmatter.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm text-muted-foreground">
            ~{meta.readingMinutes} dk okuma
          </p>
          <BlogViewTracker slug={slug} serverCount={views} />
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </header>
      <div className="prose prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none py-10 prose-headings:tracking-tight prose-a:text-foreground prose-a:underline [&_pre]:overflow-x-auto [&_figure]:!my-6">
        {content}
      </div>
    </article>
  );
}
