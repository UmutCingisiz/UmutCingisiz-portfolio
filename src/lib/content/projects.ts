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

const readAllProjectsMeta = cache((): ProjectMeta[] => {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const items = files
    .map(parseProjectFile)
    .filter((x): x is ProjectMeta => x !== null);
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
});

export function getAllProjectsMeta(): ProjectMeta[] {
  return readAllProjectsMeta();
}

export function getProjectMetaBySlug(slug: string): ProjectMeta | null {
  if (!getProjectSlugs().includes(slug)) return null;
  const file = `${slug}.mdx`;
  const fp = path.join(PROJECTS_DIR, file);
  if (!fs.existsSync(fp)) return null;
  return parseProjectFile(file);
}

export function getProjectSlugs(): string[] {
  return getAllProjectsMeta().map((p) => p.slug);
}

export function getFeaturedProjects(limit = 2): ProjectMeta[] {
  const all = getAllProjectsMeta();
  const featured = all.filter((p) => p.featured);
  const picked =
    featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit);
  return picked;
}

export function filterProjectsByCategory(
  category: ProjectCategory | "all",
): ProjectMeta[] {
  const all = getAllProjectsMeta();
  if (category === "all") return all;
  return all.filter((p) => p.category === category);
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
} {
  const all = getAllProjectsMeta();
  const index = all.findIndex((project) => project.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: all[index + 1] ?? null,
    next: all[index - 1] ?? null,
  };
}
