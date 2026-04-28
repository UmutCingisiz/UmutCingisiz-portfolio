import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Teknik yazılar — MDX, kod vurgusu ve okuma süresi.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Blog
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        MDX ile yazılmış içerikler. Görüntülenme sayacı Faz 3 ile eklenecek.
      </p>

      <ul className="mt-12 space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border pb-8 last:border-0">
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
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-accent hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-muted-foreground">{post.description}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              ~{post.readingMinutes} dk okuma
            </p>
          </li>
        ))}
      </ul>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">Henüz yazı yok.</p>
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
