import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  clearProjectOverrideAction,
  saveProjectOverrideAction,
  signInAdminAction,
  signOutAdminAction,
} from "@/app/admin/projects/actions";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { getMdxProjectsMeta } from "@/lib/content/projects";
import { PROJECT_STATUS_VALUES } from "@/lib/content/schema";
import { isGuestbookModerator } from "@/lib/guestbook-admin";
import {
  getProjectOverridesMap,
  mergeProjectMeta,
} from "@/lib/project-overrides";
import {
  getProjectStatusLabel,
} from "@/lib/project-status";

export const metadata: Metadata = {
  title: "Projeler admin",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
    cleared?: string;
    err?: string;
    denied?: string;
  }>;
}) {
  const sp = await searchParams;
  const session = await auth();
  const githubId = session?.user?.githubId;
  const isAdmin = isGuestbookModerator(githubId);
  const dbConfigured = Boolean(getDb());

  if (session?.user && !isAdmin) {
    notFound();
  }

  if (!session?.user || !isAdmin) {
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Projeler admin
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Status ve featured yönetmek için GitHub ile giriş yap.
        </p>
        {sp.denied === "1" ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm"
          >
            Bu işlem için site sahibi hesabına ihtiyacın var.
          </p>
        ) : null}
        <form action={signInAdminAction} className="mt-6">
          <button
            type="submit"
            className="btn-signal rounded-lg px-4 py-2 text-sm font-semibold"
          >
            GitHub ile giriş
          </button>
        </form>
      </div>
    );
  }

  const mdxProjects = getMdxProjectsMeta();
  const overrides = dbConfigured
    ? await getProjectOverridesMap()
    : new Map();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            admin.projects
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Projeler
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Sadece status ve featured. MDX gövdesi dosyada kalır; override
            temizlenince MDX değerine döner.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">
            @{session.user.githubLogin ?? session.user.name ?? "admin"}
          </span>
          <form action={signOutAdminAction}>
            <button
              type="submit"
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
            >
              Çıkış
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {sp.saved === "1" ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm"
          >
            Override kaydedildi.
          </p>
        ) : null}
        {sp.cleared === "1" ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm"
          >
            Override temizlendi — MDX fallback aktif.
          </p>
        ) : null}
        {sp.err === "db" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm"
          >
            Veritabanı yapılandırılmamış (`DATABASE_URL`).
          </p>
        ) : null}
        {sp.err === "1" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm"
          >
            Kayıt tamamlanamadı — tekrar dene.
          </p>
        ) : null}
        {!dbConfigured ? (
          <p
            role="status"
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm"
          >
            DB yok — public site MDX kullanıyor; kaydetme kapalı.
          </p>
        ) : null}
      </div>

      <ul className="mt-8 space-y-4">
        {mdxProjects.map((mdx) => {
          const override = overrides.get(mdx.slug) ?? null;
          const effective = mergeProjectMeta(mdx, override);
          const hasOverride = Boolean(override);
          const statusSource =
            override?.status != null ? "override" : "mdx";
          const featuredSource =
            override?.featured != null ? "override" : "mdx";

          return (
            <li
              key={mdx.slug}
              className="rounded-xl border border-border bg-card/60 p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    {mdx.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {mdx.slug}
                    {" · "}
                    <Link
                      href={`/projects/${mdx.slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      public
                    </Link>
                  </p>
                </div>
                <span className="font-mono text-[0.65rem] tracking-wide text-muted-foreground">
                  {hasOverride ? "override aktif" : "yalnızca MDX"}
                </span>
              </div>

              <form
                action={saveProjectOverrideAction}
                className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end"
              >
                <input type="hidden" name="slug" value={mdx.slug} />
                <label className="flex min-w-[12rem] flex-col gap-1.5 text-sm">
                  <span className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    status ({statusSource})
                  </span>
                  <select
                    name="status"
                    defaultValue={effective.status}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    disabled={!dbConfigured}
                  >
                    {PROJECT_STATUS_VALUES.map((status) => (
                      <option key={status} value={status}>
                        {getProjectStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 pb-2 text-sm">
                  <input
                    type="checkbox"
                    name="featured"
                    value="on"
                    defaultChecked={Boolean(effective.featured)}
                    disabled={!dbConfigured}
                    className="size-4 rounded border-border"
                  />
                  <span>
                    Featured{" "}
                    <span className="font-mono text-[0.65rem] text-muted-foreground">
                      ({featuredSource})
                    </span>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!dbConfigured}
                  className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-40"
                >
                  Kaydet
                </button>
              </form>

              {hasOverride ? (
                <form action={clearProjectOverrideAction} className="mt-3">
                  <input type="hidden" name="slug" value={mdx.slug} />
                  <button
                    type="submit"
                    disabled={!dbConfigured}
                    className="text-sm text-muted-foreground underline-offset-2 hover:underline disabled:opacity-40"
                  >
                    Override’ı temizle
                  </button>
                </form>
              ) : null}

              <p className="mt-3 font-mono text-[0.65rem] text-muted-foreground">
                MDX: {getProjectStatusLabel(mdx.status)}
                {mdx.featured ? " · featured" : ""}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
