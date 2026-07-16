import { neon } from "@neondatabase/serverless";

let sqlSingleton: ReturnType<typeof neon> | null = null;

/**
 * Legacy raw Neon SQL client. Prefer `src/db/client.ts` for app code.
 * Kept for setup scripts and raw checks.
 */
export function getNeonSql() {
  const url = process.env.DATABASE_URL;
  if (!url?.trim()) return null;
  if (!sqlSingleton) sqlSingleton = neon(url);
  return sqlSingleton;
}
