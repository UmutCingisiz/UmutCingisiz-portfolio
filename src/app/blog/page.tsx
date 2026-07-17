import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/content/posts";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Spotlight } from "@/components/spotlight";

export const metadata: Metadata = {
  title: "Blog",
  description: "Teknik yazılar — MDX, kod vurgusu ve okuma süresi.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <SectionEyebrow>technical.notes</SectionEyebrow>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Blog
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        MDX ile yazılmış içerikler — okuma süresi başlıkta, kod vurgusu ve başlık
        bağlantıları yazı sayfasında.
      </p>

      <ul className="mt-12 space-y-4">
        {posts.map((post) => (
          <Spotlight
            as="li"
            key={post.slug}
            className="group rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-lg"
          >
            <div className="flex flex-wrap items-center gap-3">
              <time
                dateTime={post.date}
                className="font-mono text-xs text-muted-foreground"
              >
                {new Date(post.date).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="font-mono text-xs text-muted-foreground">
                ~{post.readingMinutes} dk
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              {post.description}
            </p>
          </Spotlight>
        ))}
      </ul>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">Henüz yazı yok.</p>
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
