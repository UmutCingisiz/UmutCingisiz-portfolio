"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ProjectMeta } from "@/lib/content/projects";

type Props = {
  projects: ProjectMeta[];
};

export function FeaturedProjectsList({ projects }: Props) {
  return (
    <section
      id="projects"
      className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              selected.case_studies
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projeler kısmı işe alım kararını etkileyen bölüm olmalı.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Bu kartlar &ldquo;ne kullandım?&rdquo; listesinden daha fazlası: problem,
              mühendislik kararı, teknik risk ve sonuç hikayesini görünür kılar.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
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
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
              >
                <div className="absolute -right-16 -top-16 size-40 rounded-full bg-foreground/[0.03] blur-3xl transition-all duration-500 group-hover:bg-foreground/[0.06]" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted/50 font-mono text-sm font-semibold text-foreground">
                    {String(p.category).slice(0, 2).toUpperCase()}
                  </div>
                  <span className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                    {p.status ?? "featured"}
                  </span>
                </div>

                <p className="relative mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {p.category}
                </p>
                <h3 className="relative mt-2 text-xl font-semibold tracking-tight text-foreground">
                  <Link href={`/projects/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
                  {p.description}
                </p>

                <div className="relative mt-5 grid gap-3">
                  {p.problem ? (
                    <div className="rounded-lg border border-border bg-muted/35 p-3">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                        problem
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/85">
                        {p.problem}
                      </p>
                    </div>
                  ) : null}
                  {p.decision ? (
                    <div className="rounded-lg border border-border bg-muted/35 p-3">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                        decision
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/85">
                        {p.decision}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="relative mt-6 flex flex-wrap gap-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex h-10 items-center rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-all duration-200 hover:opacity-90"
                  >
                    İncele →
                  </Link>
                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                    >
                      Demo ↗
                    </a>
                  ) : null}
                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
                    >
                      Kod ↗
                    </a>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
