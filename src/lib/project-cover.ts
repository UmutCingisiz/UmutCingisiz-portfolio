import type { ProjectMeta } from "@/lib/content/projects";
import type { ProjectDevice } from "@/lib/content/schema";

export type StageShot = { src: string; alt: string; caption?: string };

export function getProjectCoverSrc(project: ProjectMeta) {
  return project.coverImage ?? project.gallery?.[0]?.src ?? null;
}

export function getProjectCoverAlt(project: ProjectMeta) {
  return project.gallery?.[0]?.alt ?? project.title;
}

export function getProjectDevice(project: ProjectMeta): ProjectDevice {
  return project.device ?? "web";
}

/** Sahnede gösterilecek görseller: kapak önde, galeriden tekrarsız. */
export function getStageShots(project: ProjectMeta, limit: number): StageShot[] {
  const shots: StageShot[] = [];
  const seen = new Set<string>();
  const push = (src: string | undefined, alt: string, caption?: string) => {
    if (!src || seen.has(src) || shots.length >= limit) return;
    seen.add(src);
    shots.push({ src, alt, caption });
  };
  const cover = project.coverImage;
  push(
    cover,
    getProjectCoverAlt(project),
    project.gallery?.find((item) => item.src === cover)?.caption,
  );
  for (const item of project.gallery ?? []) push(item.src, item.alt, item.caption);
  return shots;
}

/** "Qid Game: Eğitim Odaklı Mobil Oyun" → ad + alt başlık. */
export function splitProjectTitle(title: string): { name: string; tagline: string | null } {
  const index = title.indexOf(":");
  if (index < 0) return { name: title, tagline: null };
  return {
    name: title.slice(0, index).trim(),
    tagline: title.slice(index + 1).trim() || null,
  };
}
