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

describe("content loaders", () => {
  test("returns expected project slugs", () => {
    const slugs = getProjectSlugs();
    expect(slugs).toContain("bloomedu");
    expect(slugs).toContain("portfolio-web");
    expect(slugs).toContain("zeki-dekorasyon");
  });

  test("returns expected blog slugs", () => {
    const slugs = getPostSlugs();
    expect(slugs).toContain("mdx-ile-blog");
    expect(slugs).toContain("server-actions-ve-formlar");
    expect(slugs).toContain("nextjs-server-actions-guvenlik");
  });

  test("project list is sorted by descending date", () => {
    const projects = getAllProjectsMeta();
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

  test("meta lookup returns null for unknown slug", () => {
    expect(getProjectMetaBySlug("missing-project")).toBeNull();
    expect(getPostMetaBySlug("missing-post")).toBeNull();
  });

  test("featured projects respect limit", () => {
    const items = getFeaturedProjects(2);
    expect(items.length).toBeLessThanOrEqual(2);
  });
});
