import { describe, expect, test } from "vitest";

import {
  getAllPostsMeta,
  getPostMetaBySlug,
  getPostSlugs,
} from "@/lib/content/posts";
import {
  getAllProjectsMeta,
  getFeaturedProjects,
  getProjectMetaBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";
import { mergeProjectMeta } from "@/lib/project-overrides";
import type { ProjectMeta } from "@/lib/content/projects";

const sampleBase: ProjectMeta = {
  slug: "demo",
  title: "Demo",
  description: "Desc",
  date: "2026-01-01",
  tags: ["Next.js"],
  category: "full-stack",
  problem: "P",
  decision: "D",
  impact: "I",
  status: "live",
  featured: true,
};

describe("content loaders", () => {
  test("returns expected project slugs", () => {
    const slugs = getProjectSlugs();
    expect(slugs).toContain("aras-mali");
    expect(slugs).toContain("bloomedu");
    expect(slugs).toContain("portfolio-web");
    expect(slugs).toContain("zeki-dekorasyon");
  });

  test("returns expected blog slugs", () => {
    const slugs = getPostSlugs();
    expect(slugs).toHaveLength(2);
    expect(slugs).toContain("bloomedu-bigg-sureci");
    expect(slugs).toContain("nextjs-server-actions-guvenlik");
  });

  test("project list is sorted by descending date", async () => {
    const projects = await getAllProjectsMeta();
    const dates = projects.map((p) => new Date(p.date).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  test("post list is sorted by descending date", () => {
    const posts = getAllPostsMeta();
    const dates = posts.map((p) => new Date(p.date).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  test("meta lookup returns null for unknown slug", async () => {
    expect(await getProjectMetaBySlug("missing-project")).toBeNull();
    expect(getPostMetaBySlug("missing-post")).toBeNull();
  });

  test("featured projects respect limit", async () => {
    const items = await getFeaturedProjects(2);
    expect(items.length).toBeLessThanOrEqual(2);
  });

  test("all project cards expose case-study signals", async () => {
    const projects = await getAllProjectsMeta();

    for (const project of projects) {
      expect(project.problem).toBeTruthy();
      expect(project.decision).toBeTruthy();
      expect(project.impact).toBeTruthy();
      expect(project.status).toBeTruthy();
    }
  });
});

describe("mergeProjectMeta", () => {
  test("returns base when override is missing", () => {
    expect(mergeProjectMeta(sampleBase, null)).toEqual(sampleBase);
    expect(mergeProjectMeta(sampleBase, undefined)).toEqual(sampleBase);
  });

  test("applies status override only", () => {
    const merged = mergeProjectMeta(sampleBase, {
      status: "testing",
      featured: null,
    });
    expect(merged.status).toBe("testing");
    expect(merged.featured).toBe(true);
  });

  test("applies featured override only", () => {
    const merged = mergeProjectMeta(sampleBase, {
      status: null,
      featured: false,
    });
    expect(merged.status).toBe("live");
    expect(merged.featured).toBe(false);
  });

  test("applies both overrides", () => {
    const merged = mergeProjectMeta(sampleBase, {
      status: "in-progress",
      featured: false,
    });
    expect(merged.status).toBe("in-progress");
    expect(merged.featured).toBe(false);
  });
});
