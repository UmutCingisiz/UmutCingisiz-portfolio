const SEP = /\s*,\s*/;

/** Site-wide admin IDs (guestbook moderation + /admin/projects). */
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
