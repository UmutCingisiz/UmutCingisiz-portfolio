import Link from "next/link";

import { fetchRecentGithubRepos } from "@/lib/github-repos";
import { getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";
import { GitLogFeed, type GitLogEntry } from "@/components/git-log-feed";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { TiltCard } from "@/components/tilt-card";

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "bugün";
  if (days === 1) return "dün";
  if (days < 7) return `${days} gün önce`;
  if (days < 30) return `${Math.floor(days / 7)} hafta önce`;
  if (days < 365) return `${Math.floor(days / 30)} ay önce`;
  return `${Math.floor(days / 365)} yıl önce`;
}

function shortHash(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(7, "0").slice(0, 7);
}

export async function GithubActivitySection() {
  const login = getGithubUsername();
  if (!login) return null;

  const repos = await fetchRecentGithubRepos(login);
  if (!repos?.length) {
    return (
      <section className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6">
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

  const logEntries: GitLogEntry[] = repos.slice(0, 6).map((repo) => ({
    repo: repo.name,
    when: relativeTime(repo.pushed_at),
    language: repo.language ?? null,
    hash: shortHash(repo.name + repo.pushed_at),
    url: repo.html_url,
  }));

  return (
    <section className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <SectionEyebrow>github.signal</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Canlı geliştirme aktivitesi
            </h2>
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

        <Reveal className="mt-10">
          <GitLogFeed entries={logEntries} />
        </Reveal>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {repos.slice(0, 6).map((repo, index) => (
            <li key={repo.html_url}>
              <Reveal index={index} className="h-full">
                <TiltCard
                  as="a"
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  max={7}
                  className="premium-card gradient-border group flex h-full flex-col rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-foreground group-hover:text-signal">
                      {repo.name}
                    </span>
                    {typeof repo.stargazers_count === "number" && repo.stargazers_count > 0 ? (
                      <span className="font-mono text-xs text-muted-foreground">
                        ★ {repo.stargazers_count}
                      </span>
                    ) : null}
                  </div>
                  {repo.description ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {repo.description}
                    </p>
                  ) : null}
                  <div className="mt-auto flex items-center gap-3 pt-4 font-mono text-[0.65rem] text-muted-foreground">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="signal-dot size-1.5" />
                        {repo.language}
                      </span>
                    ) : null}
                    <span className="ml-auto">{relativeTime(repo.pushed_at)}</span>
                  </div>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
