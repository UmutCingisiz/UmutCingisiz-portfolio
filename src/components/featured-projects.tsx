import Link from "next/link";
import { getFeaturedProjects } from "@/lib/content/projects";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(2);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border bg-muted/40 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Öne çıkan projeler
            </h2>
            <p className="mt-2 text-muted-foreground">
              MDX içeriğinde <code className="font-mono text-sm">featured: true</code>{" "}
              olan projeler burada listelenir.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-accent hover:underline"
          >
            Tümünü gör
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            Henüz öne çıkan proje yok. Bir MDX dosyasında{" "}
            <code className="font-mono text-sm">featured: true</code> kullan.
          </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <li
                key={p.slug}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-accent/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted font-mono text-lg">
                  ◇
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-wide text-accent">
                  {p.category}
                </p>
                <h3 className="mt-2 font-semibold text-foreground">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="hover:underline"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${p.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  Detay
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
