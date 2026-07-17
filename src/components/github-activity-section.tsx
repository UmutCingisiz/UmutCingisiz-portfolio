import Link from "next/link";

import { fetchRecentGithubRepos } from "@/lib/github-repos";
import { getGithubUsername } from "@/lib/github-username";
import { siteConfig } from "@/lib/site-config";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { Spotlight } from "@/components/spotlight";

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

  return (
    <section className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <SectionEyebrow>github.signal</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Son güncellenen repolar
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
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <li key={repo.html_url}>
              <Spotlight
                as="a"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer noopener"
                className="block h-full rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-lg"
              >
                <span className="font-medium text-foreground">{repo.name}</span>
                {typeof repo.stargazers_count === "number" ? (
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    ★ {repo.stargazers_count}
                  </span>
                ) : null}
                {repo.description ? (
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {repo.description}
                  </p>
                ) : null}
                <p className="mt-2 font-mono text-[0.65rem] text-muted-foreground">
                  {new Date(repo.pushed_at).toLocaleDateString("tr-TR")} — push
                </p>
              </Spotlight>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
