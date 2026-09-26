import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjectsMeta, sortBySpotlight } from "@/lib/content/projects";
import { Reveal } from "@/components/reveal";
import { Exhibit } from "@/components/projects-exhibition";
import { pageSocial } from "@/lib/site-metadata";
import { withSiteFooter } from "@/components/with-site-footer";
import { isShippedStatus } from "@/lib/project-status";
import { ProjectsHero } from "@/components/projects-hero";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Yayında olan çalışmalar ve süren geliştirmeler.",
  ...pageSocial("/projects", {
    title: "Projeler",
    description:
      "Yayında olan çalışmalar ve süren geliştirmeler.",
  }),
};

export default async function ProjectsPage() {
  const projects = await getAllProjectsMeta();
  const live = sortBySpotlight(projects.filter((project) => isShippedStatus(project.status)));
  const building = sortBySpotlight(projects.filter((project) => !isShippedStatus(project.status)));
  const [lead, ...rest] = building;

  return withSiteFooter(
    <div className="relative flex-1 pb-16 sm:pb-24">
      <ProjectsHero />

      {live.length > 0 ? (
        <section id="live" aria-labelledby="live-title" className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-2 border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <h2 id="live-title" className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Yayında
              </h2>
            </div>
            <p className="text-base text-muted-foreground ml-11">Canlıda yer alan çalışmalar.</p>
          </div>
          <div className="space-y-5 sm:space-y-6">
            {live.map((project, index) => (
              <Reveal key={project.slug} index={index}>
                <Exhibit project={project} index={index} layout="spread" eager={index === 0} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {building.length > 0 ? (
        <section id="building" aria-labelledby="building-title" className="mx-auto mt-16 max-w-6xl px-4 sm:mt-24 sm:px-6">
          <div className="mb-8 flex flex-col gap-2 border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              <h2 id="building-title" className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Geliştiriliyor
              </h2>
            </div>
            <p className="text-base text-muted-foreground ml-11">Yayın hazırlığı süren çalışmalar.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {building.map((project, index) => (
              <Reveal key={project.slug} index={index} className="h-full">
                <Exhibit project={project} index={index} layout="tile" />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {projects.length === 0 ? (
        <div className="mx-auto mt-12 max-w-6xl px-4">
          <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
            <p className="font-medium text-foreground">Henüz yayınlanmış proje yok.</p>
            <p className="mt-2 text-sm text-muted-foreground">Çalışmalar eklendikçe burada görünecek.</p>
          </div>
        </div>
      ) : null}

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline">
          ← Ana sayfa
        </Link>
      </div>
    </div>,
  );
}
