import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import {
  projectFrontmatterSchema,
  type ProjectFrontmatter,
  type ProjectCategory,
} from "@/lib/content/schema";
import { PROJECTS_DIR } from "@/lib/content/paths";
import {
  getProjectOverridesMap,
  mergeProjectMeta,
} from "@/lib/project-overrides";

export type ProjectMeta = ProjectFrontmatter & { slug: string };

const parseProjectFile = cache((file: string): ProjectMeta | null => {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data } = matter(raw);
  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Geçersiz frontmatter: projects/${file}`, parsed.error.flatten());
    return null;
  }
  const slug = file.replace(/\.mdx$/u, "");
  return { ...parsed.data, slug };
});

const readAllProjectsMetaFromMdx = cache((): ProjectMeta[] => {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const items = files
    .map(parseProjectFile)
    .filter((x): x is ProjectMeta => Boolean(x));
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
});

async function mergeAllProjectsMeta(): Promise<ProjectMeta[]> {
  const base = readAllProjectsMetaFromMdx();
  const overrides = await getProjectOverridesMap();
  return base.map((project) =>
    mergeProjectMeta(project, overrides.get(project.slug)),
  );
}

/** MDX-only slugs — static params / existence checks (not overridden by DB). */
export function getProjectSlugs(): string[] {
  return readAllProjectsMetaFromMdx().map((p) => p.slug);
}

export function projectSlugExists(slug: string): boolean {
  return getProjectSlugs().includes(slug);
}

export async function getAllProjectsMeta(): Promise<ProjectMeta[]> {
  return mergeAllProjectsMeta();
}

export async function getProjectMetaBySlug(
  slug: string,
): Promise<ProjectMeta | null> {
  if (!projectSlugExists(slug)) return null;
  const file = `${slug}.mdx`;
  const fp = path.join(PROJECTS_DIR, file);
  if (!fs.existsSync(fp)) return null;
  const base = parseProjectFile(file);
  if (!base) return null;
  const overrides = await getProjectOverridesMap();
  return mergeProjectMeta(base, overrides.get(slug));
}

/** `spotlight` küçük olan önce; olmayanlar tarih sırasını korur. */
export function sortBySpotlight(projects: ProjectMeta[]): ProjectMeta[] {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const sa = a.project.spotlight ?? Number.POSITIVE_INFINITY;
      const sb = b.project.spotlight ?? Number.POSITIVE_INFINITY;
      return sa === sb ? a.index - b.index : sa - sb;
    })
    .map(({ project }) => project);
}

export async function getFeaturedProjects(limit = 2): Promise<ProjectMeta[]> {
  const all = await getAllProjectsMeta();
  const featured = sortBySpotlight(all.filter((p) => p.featured));
  const picked =
    featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit);
  return picked;
}

export async function filterProjectsByCategory(
  category: ProjectCategory | "all",
): Promise<ProjectMeta[]> {
  const all = await getAllProjectsMeta();
  if (category === "all") return all;
  return all.filter((p) => p.category === category);
}

/**
 * Komşu projeler — `getAllProjectsMeta()` sırasına göre (yeniden eskiye).
 * Önceki = listedeki bir üst (index - 1), Sonraki = listedeki bir alt (index + 1).
 */
export async function getAdjacentProjects(slug: string): Promise<{
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
}> {
  const all = await getAllProjectsMeta();
  const index = all.findIndex((project) => project.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? (all[index - 1] ?? null) : null,
    next: index < all.length - 1 ? (all[index + 1] ?? null) : null,
  };
}

/** Admin: MDX baseline without DB merge. */
export function getMdxProjectsMeta(): ProjectMeta[] {
  return readAllProjectsMetaFromMdx();
}
