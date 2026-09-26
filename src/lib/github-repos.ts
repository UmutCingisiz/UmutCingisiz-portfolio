import { siteConfig } from "@/lib/site-config";

export type GithubRepoSummary = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count?: number;
  language?: string | null;
  pinned?: boolean;
  kind?: "project" | "foundation";
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
 * Ürün repoları önde, temel eğitim repoları arkada.
 * İkisinde de olmayanlar (profil README’si dahil) düşer.
 */
export function buildGithubFeed(
  repos: GithubRepoApi[],
  pinnedNames: readonly string[] = siteConfig.pinnedRepos,
  foundationNames: readonly string[] = siteConfig.foundationRepos,
): GithubRepoSummary[] {
  const projects = filterPinnedGithubRepos(repos, pinnedNames).map((repo) => ({
    ...repo,
    kind: "project" as const,
  }));
  const taken = new Set(projects.map((repo) => normalizeRepoKey(repo.name)));
  const foundations = filterPinnedGithubRepos(repos, foundationNames)
    .filter((repo) => !taken.has(normalizeRepoKey(repo.name)))
    .map((repo) => ({
      ...repo,
      kind: "foundation" as const,
      pinned: false,
    }));
  return [...projects, ...foundations];
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

/** Public API’de olmayan küratör repo — katalog açıklamasıyla kart. */
export function catalogFallback(
  login: string,
  name: string,
  catalog: { description: string; language: string },
): GithubRepoSummary {
  return {
    name,
    description: catalog.description || null,
    html_url: `https://github.com/${login}/${name}`,
    pushed_at: "",
    language: resolveLanguage(name, catalog.language),
    pinned: true,
    kind: "project",
  };
}

/**
 * Sıra: kullanıcı reposu → org kaynağı → katalog yedeği.
 * Katalog, private olduğu için public API’de görünmeyen işleri de listeler.
 */
export async function fetchRecentGithubRepos(login: string) {
  const url = `https://api.github.com/users/${encodeURIComponent(login)}/repos?sort=pushed&per_page=100&type=owner`;
  const data = await fetchJson<GithubRepoApi[]>(url);
  const userRepos = Array.isArray(data) ? data : [];
  const apiFailed = data === null;

  const fromUser = buildGithubFeed(userRepos);
  const projects: GithubRepoSummary[] = [];

  for (const pinned of siteConfig.pinnedRepos) {
    const key = normalizeRepoKey(pinned);
    const local = fromUser.find(
      (repo) => repo.kind === "project" && normalizeRepoKey(repo.name) === key,
    );
    if (local) {
      projects.push(local);
      continue;
    }

    const fromSource = await fetchPinnedFromSources(pinned);
    if (fromSource) {
      projects.push({ ...fromSource, kind: "project", pinned: true });
      continue;
    }

    const catalog = siteConfig.repoCatalog[pinned];
    if (!catalog) continue;
    projects.push(catalogFallback(login, pinned, catalog));
  }

  const foundations = fromUser.filter((repo) => repo.kind === "foundation");

  if (apiFailed && projects.length === 0) return null;
  return [...projects, ...foundations];
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
