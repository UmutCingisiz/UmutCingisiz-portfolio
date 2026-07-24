import Link from "next/link";
import { getAllPostsMeta } from "@/lib/content/posts";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

export function BlogPostList() {
  const posts = getAllPostsMeta();

  return (
    <>
      <SectionEyebrow>technical.notes</SectionEyebrow>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Blog
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        MDX ile yazılmış içerikler — okuma süresi başlıkta, kod vurgusu ve başlık
        bağlantıları yazı sayfasında.
      </p>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/30 px-6 py-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            empty.feed
          </p>
          <p className="mt-4 text-base font-medium text-foreground">
            Henüz yayınlanmış yazı yok.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Yeni teknik notlar burada görünecek. Bu arada projeleri inceleyebilirsin.
          </p>
          <Link
            href="/projects"
            className="mt-6 inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Projelere git
          </Link>
        </div>
      ) : (
        <ul className="mt-12 space-y-4">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal index={index}>
                <article className="group rounded-2xl border border-border bg-card/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50"
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
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-signal">
                      {post.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-signal">
                      oku →
                    </span>
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
