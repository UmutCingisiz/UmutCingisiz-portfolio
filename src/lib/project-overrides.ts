import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

import { getDb } from "@/db/client";
import { projectOverride } from "@/db/schema";
import type { ProjectStatusValue } from "@/lib/content/schema";

/** Cache tag — invalidate on upsert / clear */
export const PROJECT_OVERRIDES_TAG = "project-overrides";

export type ProjectOverrideFields = {
  status: ProjectStatusValue | null;
  featured: boolean | null;
};

export type ProjectOverrideRow = ProjectOverrideFields & {
  slug: string;
  updatedAt: string;
  updatedByGithubId: string;
};

export function mergeProjectMeta<
  T extends { status: ProjectStatusValue; featured?: boolean },
>(base: T, override: ProjectOverrideFields | null | undefined): T {
  if (!override) return base;
  return {
    ...base,
    status: override.status ?? base.status,
    featured: override.featured ?? base.featured,
  };
}

async function listProjectOverridesUncached(): Promise<ProjectOverrideRow[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const rows = await db.select().from(projectOverride);
    return rows.map((row) => ({
      slug: row.slug,
      status: (row.status as ProjectStatusValue | null) ?? null,
      featured: row.featured ?? null,
      updatedAt: row.updatedAt,
      updatedByGithubId: row.updatedByGithubId,
    }));
  } catch {
    // Fail-soft: missing table / transient DB → MDX only
    return [];
  }
}

export async function listCachedProjectOverrides(): Promise<
  ProjectOverrideRow[]
> {
  try {
    return await unstable_cache(
      async () => listProjectOverridesUncached(),
      ["project-overrides"],
      { revalidate: 60, tags: [PROJECT_OVERRIDES_TAG] },
    )();
  } catch {
    // Vitest / non-Next runtimes lack incrementalCache
    return listProjectOverridesUncached();
  }
}

export async function getProjectOverridesMap(): Promise<
  Map<string, ProjectOverrideFields>
> {
  const rows = await listCachedProjectOverrides();
  const map = new Map<string, ProjectOverrideFields>();
  for (const row of rows) {
    map.set(row.slug, {
      status: row.status,
      featured: row.featured,
    });
  }
  return map;
}

export async function upsertProjectOverride(input: {
  slug: string;
  status: ProjectStatusValue;
  featured: boolean;
  updatedByGithubId: string;
}): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL eksik.");

  const now = new Date().toISOString();

  await db
    .insert(projectOverride)
    .values({
      slug: input.slug,
      status: input.status,
      featured: input.featured,
      updatedByGithubId: input.updatedByGithubId,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: projectOverride.slug,
      set: {
        status: input.status,
        featured: input.featured,
        updatedByGithubId: input.updatedByGithubId,
        updatedAt: now,
      },
    });
}

export async function clearProjectOverride(slug: string): Promise<boolean> {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL eksik.");

  const deleted = await db
    .delete(projectOverride)
    .where(eq(projectOverride.slug, slug))
    .returning({ slug: projectOverride.slug });

  return deleted.length > 0;
}
