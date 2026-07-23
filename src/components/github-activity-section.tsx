import Link from "next/link";

import {
  fetchRecentGithubRepos,
  type GithubRepoSummary,
} from "@/lib/github-repos";
import { getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";
import { GitLogFeed, type GitLogEntry } from "@/components/git-log-feed";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";

function RepoCard({
  repo,
  index,
}: {
  repo: GithubRepoSummary;
  index: number;
}) {
  return (
    <Reveal index={index} className="h-full">
      <article className="surface-card group flex h-full flex-col p-5">
        <div className="relative flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground">{repo.name}</h3>
          {typeof repo.stargazers_count === "number" &&
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
          ) : (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
              <span className="size-1.5 rounded-full bg-border" />
              dil bilinmiyor
            </span>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-auto inline-flex items-center gap-1.5 text-signal hover:underline"
          >
            Repoyu aç →
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export async function GithubActivitySection() {
  const login = getGithubUsername();
  if (!login) return null;

  const repos = await fetchRecentGithubRepos(login);
  const recentFailed = repos === null;
  const recent = repos ?? [];

  if (!recent.length) {
    return (
      <section
        id="github"
        className="scroll-mt-24 border-y border-border bg-muted/30 px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground">GitHub</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {recentFailed
              ? "Repo listesi yüklenemedi (API limiti veya ağ)."
              : "Henüz listelenecek recent repo yok."}{" "}
            <Link
              href={siteConfig.github}
              className="underline underline-offset-4 hover:text-foreground"
            >
              Profili aç
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  const logEntries: GitLogEntry[] = recent.slice(0, 6).map((repo) => ({
    repo: repo.name,
    language: repo.language ?? null,
    url: repo.html_url,
  }));

  const languages = Array.from(
    new Set(recent.map((r) => r.language).filter(Boolean)),
  ) as string[];

  return (
    <section
      id="github"
      className="scroll-mt-24 border-y border-border bg-muted/30 px-4 py-14 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <SectionEyebrow>github.signal</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Canlı geliştirme aktivitesi
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              GitHub API’den gerçek recent repo feed’i — sahte commit hash yok.
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

        {/* Craft strip — recent kart tasarımına dokunmadan üst sinyal */}
        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-[var(--radius-lg)] border border-border bg-card/40 px-4 py-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            signal.pulse
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-mono text-xs text-foreground/80">
            {recent.length} recent repo
          </span>
          {languages.slice(0, 5).map((lang) => (
            <span
              key={lang}
              className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
            >
              {lang}
            </span>
          ))}
          <a
            href={`https://github.com/${login}?tab=repositories`}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-auto font-mono text-[0.65rem] text-signal hover:underline"
          >
            tüm repolar ↗
          </a>
        </div>

        {logEntries.length > 0 ? (
          <Reveal className="mt-8">
            <GitLogFeed entries={logEntries} />
          </Reveal>
        ) : null}

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {recent.slice(0, 6).map((repo, index) => (
            <li key={repo.html_url}>
              <RepoCard repo={repo} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
