"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth, signIn, signOut } from "@/auth";
import { getDb } from "@/db/client";
import { projectSlugExists } from "@/lib/content/projects";
import { projectStatusSchema } from "@/lib/content/schema";
import { isGuestbookModerator } from "@/lib/guestbook-admin";
import { logPortfolioError, logPortfolioEvent } from "@/lib/observability";
import {
  clearProjectOverride,
  PROJECT_OVERRIDES_TAG,
  upsertProjectOverride,
} from "@/lib/project-overrides";

async function requireProjectAdmin(): Promise<{ githubId: string }> {
  const session = await auth();
  const githubId = session?.user?.githubId;
  if (!githubId || !isGuestbookModerator(githubId)) {
    logPortfolioEvent("projects.admin_denied");
    redirect("/admin/projects?denied=1");
  }
  return { githubId };
}

function revalidateProjectSurfaces(slug: string) {
  updateTag(PROJECT_OVERRIDES_TAG);
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
}

const saveSchema = z.object({
  slug: z.string().min(1),
  status: projectStatusSchema,
  featured: z
    .union([z.literal("on"), z.literal("true"), z.literal("1"), z.null()])
    .transform((v) => v !== null),
});

export async function saveProjectOverrideAction(
  formData: FormData,
): Promise<void> {
  const { githubId } = await requireProjectAdmin();

  if (!getDb()) {
    logPortfolioEvent("projects.admin_save_failed", { reason: "no_db" });
    redirect("/admin/projects?err=db");
  }

  const featuredRaw = formData.get("featured");
  const parsed = saveSchema.safeParse({
    slug: formData.get("slug"),
    status: formData.get("status"),
    featured: typeof featuredRaw === "string" ? featuredRaw : null,
  });

  if (!parsed.success || !projectSlugExists(parsed.data.slug)) {
    logPortfolioEvent("projects.admin_save_failed", {
      reason: "invalid_payload",
    });
    redirect("/admin/projects?err=1");
  }

  try {
    await upsertProjectOverride({
      slug: parsed.data.slug,
      status: parsed.data.status,
      featured: parsed.data.featured,
      updatedByGithubId: githubId,
    });
  } catch (error) {
    logPortfolioError("projects.admin_save_failed", error, {
      slug: parsed.data.slug,
    });
    redirect("/admin/projects?err=1");
  }

  revalidateProjectSurfaces(parsed.data.slug);
  logPortfolioEvent("projects.admin_saved", {
    slug: parsed.data.slug,
    status: parsed.data.status,
    featured: parsed.data.featured,
  });
  redirect("/admin/projects?saved=1");
}

const clearSchema = z.object({
  slug: z.string().min(1),
});

export async function clearProjectOverrideAction(
  formData: FormData,
): Promise<void> {
  await requireProjectAdmin();

  if (!getDb()) {
    logPortfolioEvent("projects.admin_save_failed", { reason: "no_db" });
    redirect("/admin/projects?err=db");
  }

  const parsed = clearSchema.safeParse({
    slug: formData.get("slug"),
  });

  if (!parsed.success || !projectSlugExists(parsed.data.slug)) {
    logPortfolioEvent("projects.admin_save_failed", {
      reason: "invalid_payload",
    });
    redirect("/admin/projects?err=1");
  }

  try {
    await clearProjectOverride(parsed.data.slug);
  } catch (error) {
    logPortfolioError("projects.admin_save_failed", error, {
      slug: parsed.data.slug,
    });
    redirect("/admin/projects?err=1");
  }

  revalidateProjectSurfaces(parsed.data.slug);
  logPortfolioEvent("projects.admin_cleared", { slug: parsed.data.slug });
  redirect("/admin/projects?cleared=1");
}

export async function signInAdminAction() {
  await signIn("github", { redirectTo: "/admin/projects" });
}

export async function signOutAdminAction() {
  await signOut({ redirectTo: "/admin/projects" });
}
