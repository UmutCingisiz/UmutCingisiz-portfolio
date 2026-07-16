import { describe, expect, test } from "vitest";

import {
  postFrontmatterSchema,
  projectFrontmatterSchema,
} from "@/lib/content/schema";

describe("content schema", () => {
  test("valid project frontmatter passes", () => {
    const parsed = projectFrontmatterSchema.safeParse({
      title: "Demo Project",
      description: "Short description",
      date: "2026-07-17",
      tags: ["Next.js", "TypeScript"],
      category: "full-stack",
      problem: "Problem statement",
      decision: "Key decision",
      impact: "Measurable impact",
      status: "live",
      repo: "https://github.com/example/repo",
      demo: "https://example.com",
      featured: true,
      coverImage: "/images/projects/demo.jpg",
    });

    expect(parsed.success).toBe(true);
  });

  test("project frontmatter rejects invalid status", () => {
    const parsed = projectFrontmatterSchema.safeParse({
      title: "Demo Project",
      description: "Short description",
      date: "2026-07-17",
      tags: ["Next.js"],
      category: "frontend",
      problem: "Problem statement",
      decision: "Key decision",
      impact: "Measurable impact",
      status: "published",
    });

    expect(parsed.success).toBe(false);
  });

  test("project frontmatter requires engineering story fields", () => {
    const parsed = projectFrontmatterSchema.safeParse({
      title: "Demo Project",
      description: "Short description",
      date: "2026-07-17",
      tags: ["Next.js"],
      category: "frontend",
      status: "live",
    });

    expect(parsed.success).toBe(false);
  });

  test("project frontmatter rejects empty optional URLs and images", () => {
    const parsed = projectFrontmatterSchema.safeParse({
      title: "Demo Project",
      description: "Short description",
      date: "2026-07-17",
      tags: ["Next.js"],
      category: "frontend",
      problem: "Problem statement",
      decision: "Key decision",
      impact: "Measurable impact",
      status: "live",
      repo: "",
      coverImage: "",
    });

    expect(parsed.success).toBe(false);
  });

  test("post frontmatter accepts optional cover image", () => {
    const parsed = postFrontmatterSchema.safeParse({
      title: "Post Title",
      description: "Post description",
      date: "2026-07-17",
      tags: ["MDX"],
      coverImage: "/images/blog/cover.jpg",
    });

    expect(parsed.success).toBe(true);
  });
});
