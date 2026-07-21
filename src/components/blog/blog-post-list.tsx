import Link from "next/link";
import { getAllPostsMeta } from "@/lib/content/posts";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

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

      <ul className="mt-12 space-y-4">
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Reveal index={index}>
              <TiltCard
                as="article"
                max={5}
                className="premium-card gradient-border group rounded-2xl p-6"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative z-10 block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50"
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
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">Henüz yazı yok.</p>
      ) : null}
    </>
  );
}
