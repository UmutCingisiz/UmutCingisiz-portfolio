import type { ProjectMeta } from "@/lib/content/projects";

export type ProjectCoverFit = NonNullable<ProjectMeta["coverFit"]>;

export function getProjectCoverSrc(project: ProjectMeta) {
  return project.coverImage ?? project.gallery?.[0]?.src ?? null;
}

export function getProjectCoverAlt(project: ProjectMeta) {
  return project.gallery?.[0]?.alt ?? project.title;
}

export function getProjectCoverFit(project: ProjectMeta): ProjectCoverFit {
  return project.coverFit ?? "cover";
}

/** Kart çerçevesi — contain: dikey telefon ekranı; cover: yatay web vitrin */
export function projectCoverFrameClass(fit: ProjectCoverFit) {
  if (fit === "contain") {
    return "aspect-[3/4] w-full max-w-[20rem] mx-auto sm:max-w-[22rem] lg:max-w-none";
  }
  return "aspect-[4/3] w-full";
}

export function projectCoverImageClass(fit: ProjectCoverFit) {
  if (fit === "contain") {
    return "object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]";
  }
  return "object-contain object-top transition-transform duration-500 group-hover:scale-[1.02] sm:object-cover";
}
