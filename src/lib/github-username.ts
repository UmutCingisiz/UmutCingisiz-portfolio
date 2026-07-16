import { siteConfig } from "@/lib/site-config";

/** GitHub profil kullanıcı adı (site-config veya URL'den). */
export function getGithubUsername(): string | null {
  const fromConfig = siteConfig.githubUsername?.trim();
  if (fromConfig) return fromConfig;

  const env = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();
  if (env) return env;

  try {
    const parsed = new URL(siteConfig.github);
    if (!parsed.hostname.includes("github.com")) return null;
    const login = parsed.pathname.split("/").filter(Boolean)[0];
    return login || null;
  } catch {
    return null;
  }
}

export function getGithubAvatarUrl(login: string, size = 800) {
  return `https://avatars.githubusercontent.com/${encodeURIComponent(login)}?s=${size}`;
}
