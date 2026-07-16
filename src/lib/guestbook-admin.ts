const SEP = /\s*,\s*/;

export function getGuestbookAdminGithubIds(): string[] {
  return (process.env.GUESTBOOK_ADMIN_GITHUB_IDS ?? "")
    .split(SEP)
    .map((id) => id.trim())
    .filter(Boolean);
}

export function isGuestbookModerator(githubId: string | undefined): boolean {
  if (!githubId) return false;
  return getGuestbookAdminGithubIds().includes(String(githubId));
}
