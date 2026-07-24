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
    name: "Zeki_Dekorasyon",
    description: "catalog",
    html_url: "https://github.com/u/Zeki_Dekorasyon",
    pushed_at: "2026-02-01T00:00:00Z",
    language: "TypeScript",
  },
  {
    name: "UmutCingisiz-portfolio",
    description: "portfolio",
    html_url: "https://github.com/u/UmutCingisiz-portfolio",
    pushed_at: "2026-03-01T00:00:00Z",
    language: "TypeScript",
  },
  {
    name: "ArasMali",
    description: "firm site",
    html_url: "https://github.com/u/ArasMali",
    pushed_at: "2026-02-15T00:00:00Z",
    language: "TypeScript",
  },
];

describe("normalizeRepoKey", () => {
  it("ignores case, dashes and underscores", () => {
    expect(normalizeRepoKey("zeki-dekorasyon")).toBe("zekidekorasyon");
    expect(normalizeRepoKey("Zeki_Dekorasyon")).toBe("zekidekorasyon");
  });
});

describe("filterPinnedGithubRepos", () => {
  it("keeps only whitelisted repos with flexible name matching", () => {
    const result = filterPinnedGithubRepos(sample, [
      "UmutCingisiz-portfolio",
      "Bloomedu",
      "aras-mali",
      "zeki-dekorasyon",
    ]);

    expect(result.map((r) => r.name)).toEqual([
      "UmutCingisiz-portfolio",
      "ArasMali",
      "Zeki_Dekorasyon",
    ]);
    expect(result.every((r) => r.pinned)).toBe(true);
  });

  it("drops weak learning repos even if recently pushed", () => {
    const result = filterPinnedGithubRepos(sample, ["aras-mali"]);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("ArasMali");
  });
});
