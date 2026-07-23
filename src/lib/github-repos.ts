import { siteConfig } from "@/lib/site-config";

export type GithubRepoSummary = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count?: number;
  language?: string | null;
  pinned?: boolean;
  badge?: string;
  caseStudy?: string;
};

type GithubRepoApi = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count?: number;
  language?: string | null;
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-site",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function resolveLanguage(name: string, apiLanguage: string | null | undefined) {
  if (apiLanguage) return apiLanguage;
  const key = name.toLowerCase().replace(/[\s_]+/g, "-");
  const compact = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return (
    siteConfig.githubLanguageOverrides[key] ??
    siteConfig.githubLanguageOverrides[compact] ??
    null
  );
}

export async function fetchRecentGithubRepos(login: string) {
  const url = `https://api.github.com/users/${encodeURIComponent(login)}/repos?sort=pushed&per_page=8&type=owner`;
  const data = await fetchJson<GithubRepoApi[]>(url);
  if (!data || !Array.isArray(data)) return null;
  return data.map((repo) => ({
    ...repo,
    language: resolveLanguage(repo.name, repo.language),
    pinned: false,
  })) satisfies GithubRepoSummary[];
}

/** Tek repo meta — ekip/org repoları (Bloomedu) için. */
export async function fetchGithubRepoByFullName(
  fullName: string,
): Promise<GithubRepoSummary | null> {
  const data = await fetchJson<GithubRepoApi>(
    `https://api.github.com/repos/${fullName}`,
  );
  if (!data?.name) return null;
  return {
    name: data.name,
    description: data.description,
    html_url: data.html_url,
    pushed_at: data.pushed_at,
    stargazers_count: data.stargazers_count,
    language: resolveLanguage(data.name, data.language),
  };
}
