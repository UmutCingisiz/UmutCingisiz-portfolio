export type GithubRepoSummary = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count?: number;
};

export async function fetchRecentGithubRepos(login: string) {
  const url = `https://api.github.com/users/${encodeURIComponent(login)}/repos?sort=pushed&per_page=8&type=owner`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-site",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const data = (await res.json()) as GithubRepoSummary[];
    if (!Array.isArray(data)) return null;
    return data;
  } catch {
    return null;
  }
}
