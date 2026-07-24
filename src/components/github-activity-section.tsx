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
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/get-locale";

function RepoCard({
  repo,
  index,
  openLabel,
  languageUnknown,
}: {
  repo: GithubRepoSummary;
  index: number;
  openLabel: string;
  languageUnknown: string;
}) {
  const isInternal = repo.html_url.startsWith("/");

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
              {languageUnknown}
            </span>
          )}
          {isInternal ? (
            <Link
              href={repo.html_url}
              className="ml-auto inline-flex items-center gap-1.5 text-signal hover:underline"
            >
              {openLabel}
            </Link>
          ) : (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-auto inline-flex items-center gap-1.5 text-signal hover:underline"
            >
              {openLabel}
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export async function GithubActivitySection() {
  const login = getGithubUsername();
  if (!login) return null;

  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const t = dictionary.github;

  const repos = await fetchRecentGithubRepos(login);
  const recentFailed = repos === null;
  const recent = repos ?? [];

  if (!recent.length) {
    return (
      <section
        id="github"
        className="scroll-mt-28 border-y border-border bg-muted/30 px-4 py-12 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground">GitHub</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {recentFailed ? t.emptyFailed : t.emptyNone}{" "}
            <Link
              href={siteConfig.github}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {t.openProfile}
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
      className="scroll-mt-28 border-y border-border bg-muted/30 px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <SectionEyebrow>{t.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
          <Link
            href={`https://github.com/${login}`}
            className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
            rel="me noreferrer noopener"
            target="_blank"
          >
            @{login}
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-card/40 px-3 py-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:px-4 sm:py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
              signal.pulse
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="font-mono text-xs text-foreground/80">
              {recent.length} {t.recentCount}
            </span>
            {languages.slice(0, 4).map((lang) => (
              <span
                key={lang}
                className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
              >
                {lang}
              </span>
            ))}
          </div>
          <a
            href={`https://github.com/${login}?tab=repositories`}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[0.65rem] text-signal hover:underline sm:ml-auto"
          >
            {t.allRepos}
          </a>
        </div>

        {logEntries.length > 0 ? (
          <Reveal className="mt-6 sm:mt-8">
            <GitLogFeed entries={logEntries} />
          </Reveal>
        ) : null}

        <ul className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
          {recent.slice(0, 6).map((repo, index) => (
            <li key={`${repo.name}-${repo.html_url}`}>
              <RepoCard
                repo={repo}
                index={index}
                openLabel={t.openRepo}
                languageUnknown={t.languageUnknown}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
