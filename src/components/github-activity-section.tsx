import Link from "next/link";

import {
  fetchGithubRepoByFullName,
  fetchRecentGithubRepos,
  type GithubRepoSummary,
} from "@/lib/github-repos";
import { getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";
import { GitLogFeed, type GitLogEntry } from "@/components/git-log-feed";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

async function resolvePinnedRepos(): Promise<GithubRepoSummary[]> {
  const configured = siteConfig.githubPinned;
  const resolved = await Promise.all(
    configured.map(async (pin) => {
      const live = await fetchGithubRepoByFullName(pin.fullName);
      return {
        name: live?.name ?? pin.name,
        description: live?.description ?? pin.description,
        html_url: live?.html_url ?? pin.html_url,
        pushed_at: live?.pushed_at ?? "",
        stargazers_count: live?.stargazers_count,
        language: live?.language ?? pin.language,
        pinned: true,
        badge: pin.badge,
        caseStudy: pin.caseStudy,
      } satisfies GithubRepoSummary;
    }),
  );
  return resolved;
}

function RepoCard({
  repo,
  index,
}: {
  repo: GithubRepoSummary;
  index: number;
}) {
  const primaryHref = repo.caseStudy ?? repo.html_url;
  const isExternal = !repo.caseStudy;

  return (
    <Reveal index={index} className="h-full">
      <article
        className={`surface-card group flex h-full flex-col p-5 ${
          repo.pinned ? "border-signal/30 ring-1 ring-signal/20" : ""
        }`}
      >
        <div className="relative flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground">{repo.name}</h3>
          {repo.pinned ? (
            <span className="shrink-0 rounded-full border border-signal/30 bg-signal/[0.08] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signal">
              {repo.badge ?? "pinned"}
            </span>
          ) : typeof repo.stargazers_count === "number" &&
            repo.stargazers_count > 0 ? (
            <span className="font-mono text-xs text-muted-foreground">
              ★ {repo.stargazers_count}
            </span>
          ) : null}
        </div>
        {repo.description ? (
          <p className="relative mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {repo.description}
          </p>
        ) : null}
        <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-4 font-mono text-[0.65rem] text-muted-foreground">
          {repo.language ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="signal-dot size-1.5" />
              {repo.language}
            </span>
          ) : null}
          {isExternal ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-auto inline-flex items-center gap-1.5 text-signal hover:underline"
            >
              Repoyu aç →
            </a>
          ) : (
            <Link
              href={primaryHref}
              className="ml-auto inline-flex items-center gap-1.5 text-signal hover:underline"
            >
              Case study →
            </Link>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export async function GithubActivitySection() {
  const login = getGithubUsername();
  if (!login) return null;

  const [repos, pinned] = await Promise.all([
    fetchRecentGithubRepos(login),
    resolvePinnedRepos(),
  ]);

  const recentFailed = repos === null;
  const recent = (repos ?? []).filter(
    (r) => !pinned.some((p) => p.name.toLowerCase() === r.name.toLowerCase()),
  );

  if (!recent.length && !pinned.length) {
    return (
      <section
        id="github"
        className="scroll-mt-24 border-y border-border bg-muted/30 px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground">GitHub</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Repo listesi yüklenemedi (API limiti veya kullanıcı adı).{" "}
            <Link
              href={siteConfig.github}
              className="underline underline-offset-4 hover:text-foreground"
            >
              Profil bağlantını kontrol et
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  // Log feed yalnızca recent — pinned (ör. Bloomedu) "canlı WIP" gibi görünmesin
  const logEntries: GitLogEntry[] = recent.slice(0, 6).map((repo) => ({
    repo: repo.name,
    language: repo.language ?? null,
    url: repo.html_url,
  }));

  return (
    <section
      id="github"
      className="scroll-mt-24 border-y border-border bg-muted/30 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <SectionEyebrow>github.signal</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Canlı geliştirme aktivitesi
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Üstte pinned kanıt (yayında ürünler); altta GitHub API’den gerçek
              recent repo feed’i — sahte commit hash yok.
            </p>
          </div>
          <Link
            href={`https://github.com/${login}`}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            rel="me noreferrer noopener"
            target="_blank"
          >
            @{login}
          </Link>
        </div>

        {recentFailed && pinned.length > 0 ? (
          <p
            role="status"
            className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground"
          >
            Recent repo listesi şu an alınamadı; pinned kanıtlar gösteriliyor.
          </p>
        ) : null}

        {pinned.length > 0 ? (
          <div className="mt-10">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">
              pinned.proof · yayında
            </p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {pinned.map((repo, index) => (
                <li key={`pinned-${repo.html_url}`}>
                  <RepoCard repo={repo} index={index} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {logEntries.length > 0 ? (
          <Reveal className="mt-10">
            <GitLogFeed entries={logEntries} />
          </Reveal>
        ) : null}

        {recent.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {recent.slice(0, 6).map((repo, index) => (
              <li key={repo.html_url}>
                <RepoCard repo={repo} index={index + pinned.length} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
