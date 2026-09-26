import Link from "next/link";
import type { ProjectMeta } from "@/lib/content/projects";
import { Reveal } from "@/components/reveal";
import { ProjectCard, ProjectIndexRow } from "@/components/project-vitrin";

type Props = {
  projects: ProjectMeta[];
  others: ProjectMeta[];
};

export function FeaturedProjectsList({ projects, others }: Props) {
  return (
    <section
      id="projects"
      className="relative scroll-mt-28 overflow-hidden px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Projeler
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Seçilmiş çalışmalar.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex h-10 w-fit items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted"
          >
            Tüm projeler
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            Öne çıkan projeler yakında.{" "}
            <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
              Tüm projelere göz at
            </Link>
            .
          </p>
        ) : (
          <ul className="project-showcase mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {projects.map((project, index) => (
              <li key={project.slug} className="min-w-0">
                <Reveal index={index} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {others.length > 0 ? (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Diğer projeler
              </h3>
              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Tüm liste
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {others.map((project) => (
                <ProjectIndexRow key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
