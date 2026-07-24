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
  full_name?: string;
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

/** Case / tire / alt çizgi farklarını yok sayan eşleşme anahtarı */
export function normalizeRepoKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function toSummary(
  repo: GithubRepoApi,
  extras?: Partial<GithubRepoSummary>,
): GithubRepoSummary {
  return {
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    pushed_at: repo.pushed_at,
    stargazers_count: repo.stargazers_count,
    language: resolveLanguage(repo.name, repo.language),
    pinned: true,
    ...extras,
  };
}

/**
 * Ham GitHub listesini `pinnedRepos` sırasına göre esnek anahtarla filtreler.
 */
export function filterPinnedGithubRepos(
  repos: GithubRepoApi[],
  pinnedNames: readonly string[] = siteConfig.pinnedRepos,
): GithubRepoSummary[] {
  const byExact = new Map(
    repos.map((repo) => [repo.name.toLowerCase(), repo] as const),
  );
  const byNormalized = new Map(
    repos.map((repo) => [normalizeRepoKey(repo.name), repo] as const),
  );

  const filtered: GithubRepoSummary[] = [];
  for (const pinned of pinnedNames) {
    const repo =
      byExact.get(pinned.toLowerCase()) ??
      byNormalized.get(normalizeRepoKey(pinned));
    if (!repo) continue;
    filtered.push(toSummary(repo));
  }
  return filtered;
}

function findInUserRepos(repos: GithubRepoApi[], pinned: string) {
  const exact = pinned.toLowerCase();
  const normalized = normalizeRepoKey(pinned);
  return (
    repos.find((repo) => repo.name.toLowerCase() === exact) ??
    repos.find((repo) => normalizeRepoKey(repo.name) === normalized) ??
    null
  );
}

async function fetchPinnedFromSources(pinned: string) {
  const sources = siteConfig.pinnedRepoSources[pinned] ?? [];
  for (const fullName of sources) {
    const remote = await fetchGithubRepoByFullName(fullName);
    if (remote) {
      return { ...remote, name: pinned, pinned: true as const };
    }
  }
  return null;
}

function fallbackPinnedRepo(pinned: string): GithubRepoSummary | null {
  const fallback = siteConfig.pinnedRepoFallbacks[pinned];
  if (!fallback) return null;
  return {
    name: pinned,
    description: fallback.description,
    html_url: fallback.html_url,
    pushed_at: fallback.pushed_at,
    language: fallback.language,
    pinned: true,
    caseStudy: fallback.caseStudy,
  };
}

/**
 * Whitelist sırasıyla: kullanıcı reposu → org/fullName kaynakları → dürüst fallback.
 */
export async function fetchRecentGithubRepos(login: string) {
  const url = `https://api.github.com/users/${encodeURIComponent(login)}/repos?sort=pushed&per_page=100&type=owner`;
  const data = await fetchJson<GithubRepoApi[]>(url);
  const userRepos = Array.isArray(data) ? data : [];
  const apiFailed = data === null;

  const resolved: GithubRepoSummary[] = [];
  for (const pinned of siteConfig.pinnedRepos) {
    const fromUser = findInUserRepos(userRepos, pinned);
    if (fromUser) {
      resolved.push(toSummary(fromUser));
      continue;
    }

    const fromSource = await fetchPinnedFromSources(pinned);
    if (fromSource) {
      resolved.push(fromSource);
      continue;
    }

    const fallback = fallbackPinnedRepo(pinned);
    if (fallback) {
      resolved.push(fallback);
    }
  }

  if (apiFailed && resolved.length === 0) return null;
  return resolved;
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
