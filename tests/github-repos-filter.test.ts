import { describe, expect, it } from "vitest";
import {
  filterPinnedGithubRepos,
  normalizeRepoKey,
} from "@/lib/github-repos";

const sample = [
  {
    name: "README",
    description: "notes",
    html_url: "https://github.com/u/README",
    pushed_at: "2026-01-01T00:00:00Z",
    language: null,
  },
  {
    name: "Instructive-Basic",
    description: "learning",
    html_url: "https://github.com/u/Instructive-Basic",
    pushed_at: "2026-01-02T00:00:00Z",
    language: "JavaScript",
  },
  {
    name: "UmutCingisiz-portfolio",
    description: "portfolio",
    html_url: "https://github.com/u/UmutCingisiz-portfolio",
    pushed_at: "2026-03-01T00:00:00Z",
    language: "TypeScript",
  },
  {
    name: "Bloomedu",
    description: "edtech",
    html_url: "https://github.com/org/Bloomedu",
    pushed_at: "2026-02-15T00:00:00Z",
    language: "TypeScript",
  },
];

describe("normalizeRepoKey", () => {
  it("ignores case, dashes and underscores", () => {
    expect(normalizeRepoKey("UmutCingisiz-portfolio")).toBe(
      "umutcingisizportfolio",
    );
    expect(normalizeRepoKey("umut_cingisiz_portfolio")).toBe(
      "umutcingisizportfolio",
    );
  });
});

describe("filterPinnedGithubRepos", () => {
  it("keeps only whitelisted public repos in pinned order", () => {
    const result = filterPinnedGithubRepos(sample, [
      "UmutCingisiz-portfolio",
      "Bloomedu",
    ]);

    expect(result.map((r) => r.name)).toEqual([
      "UmutCingisiz-portfolio",
      "Bloomedu",
    ]);
    expect(result.every((r) => r.pinned)).toBe(true);
  });

  it("drops weak learning repos even if recently pushed", () => {
    const result = filterPinnedGithubRepos(sample, ["Bloomedu"]);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Bloomedu");
  });
});
