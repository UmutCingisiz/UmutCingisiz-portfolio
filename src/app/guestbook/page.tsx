import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { auth } from "@/auth";
import {
  moderateGuestbookEntry,
  signInWithGithubAction,
  signOutGuestbookAction,
} from "@/app/guestbook/actions";
import { GuestbookMessageForm } from "@/components/guestbook/guestbook-message-form";
import { getDb } from "@/db/client";
import { isGuestbookModerator } from "@/lib/guestbook-admin";
import { getGuestbookRateLimits } from "@/lib/guestbook-rate-limit";

import {
  listApprovedEntries,
  listPendingEntries,
  listRejectedEntries,
  type GuestbookEntryRow,
} from "@/lib/guestbook";
import { pageSocial } from "@/lib/site-metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ziyaretçi defteri",
  description:
    "GitHub ile oturum, Neon Postgres ve moderasyon — kısa ziyaretçi notları.",
  ...pageSocial("/guestbook", {
    title: "Ziyaretçi defteri",
    description:
      "GitHub ile oturum, Neon Postgres ve moderasyon — kısa ziyaretçi notları.",
  }),
};

function formatGuestbookDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Admin butonlarını göstermek için isMod parametresini ekledik
function GuestbookEntryBlock({ entry, isMod = false }: { entry: GuestbookEntryRow, isMod?: boolean }) {
  const initial = entry.github_username.trim().slice(0, 1).toUpperCase();
  const showLetter = entry.github_username.trim().length > 0;

  return (
    <article className="relative flex gap-3 rounded-xl border border-border bg-card/60 p-4 group">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
        {entry.avatar_url ? (
          <Image
            src={entry.avatar_url}
            alt=""
            width={40}
            height={40}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground"
            aria-hidden
          >
            {showLetter ? initial : "?"}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-medium text-foreground">
            @{entry.github_username}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatGuestbookDate(entry.created_at)}
          </span>
        </div>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
          {entry.message}
        </p>
      </div>

      {/* Adminler için mesajı yayından kaldırma (Gizle) butonu */}
      {isMod && entry.status === "approved" && (
        <form action={moderateGuestbookEntry} className="absolute top-3 right-3">
          <input type="hidden" name="id" value={entry.id} />
          <input type="hidden" name="status" value="rejected" />
          <button
            type="submit"
            className="rounded-md bg-red-500/10 px-2 py-1 text-[0.70rem] font-medium text-red-500 transition-colors hover:bg-red-500/20"
            title="Mesajı yayından kaldır"
          >
            Gizle
          </button>
        </form>
      )}
    </article>
  );
}

export default async function GuestbookPage({
  searchParams,
}: {
  searchParams: Promise<{
    sent?: string;
    moderated?: string;
    moderateErr?: string;
    denied?: string;
  }>;
}) {
  const sp = await searchParams;
  const session = await auth();
  const dbConfigured = Boolean(getDb());

  const isMod = isGuestbookModerator(session?.user?.githubId);
  const approved = dbConfigured ? await listApprovedEntries(30) : [];
  const pending = dbConfigured && isMod ? await listPendingEntries(50) : [];
  const rejected = dbConfigured && isMod ? await listRejectedEntries(50) : [];

  const canWrite = Boolean(session?.user?.githubId);

  const limits = getGuestbookRateLimits();

  const showModerationBanner = sp.denied === "1";
  const showModeratedOk = sp.moderated === "1";
  const showModerateErr = sp.moderateErr === "1";

  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Ziyaretçi defteri
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        GitHub ile giriş yap, kısa bir not bırak; site sahibinin onayından sonra
        herkese açılır. Onay / red paneli yalnızca site sahibine görünür —
        diğer ziyaretçiler sadece yayınlanan mesajları görür.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
        GitHub hesabı olmayanlar şu an mesaj bırakamaz. Bu bilinçli: anonim
        defterler spam ve botlara açık kalır. İleride e-posta doğrulamalı veya
        Turnstile korumalı anonim not eklenebilir; şimdilik GitHub kimliği
        güvenilir bir filtre.
      </p>

      <div className="mt-6 space-y-2">
        {sp.sent === "1" ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-foreground"
          >
            Mesajın alındı — moderasyon sonrası yayınlanacak.
          </p>
        ) : null}
        {showModeratedOk ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-foreground"
          >
            Moderasyon güncellendi.
          </p>
        ) : null}
        {showModerateErr ? (
          <p
            role="alert"
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-foreground"
          >
            Moderasyon işlemi tamamlanamadı — tekrar dene veya bağlantını
            kontrol et.
          </p>
        ) : null}
        {showModerationBanner ? (
          <p
            role="alert"
            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-foreground"
          >
            Bu işlem için site sahibi hesabına ihtiyacın var.
          </p>
        ) : null}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card/60 p-6">
        <h2 className="text-lg font-semibold text-foreground">Hesap</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Mesaj yazmak için GitHub ile oturum aç. Oturumu bu sayfadan
          kapatabilirsin.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {session?.user?.githubId ? (
            <>
              <span className="text-sm text-foreground">
                Giriş:{" "}
                <span className="font-medium">
                  @{session.user.githubLogin ?? session.user.name ?? "?"}
                </span>
              </span>
              <form action={signOutGuestbookAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Çıkış
                </button>
              </form>
            </>
          ) : (
            <form action={signInWithGithubAction}>
              <button
                type="submit"
                className="btn-signal rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200"
              >
                GitHub ile giriş
              </button>
            </form>
          )}
        </div>
      </div>

      {dbConfigured && isMod && pending.length > 0 ? (
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Bekleyen moderasyon
            <span className="ml-2 font-mono text-xs font-normal uppercase tracking-[0.14em] text-amber-200/80">
              sadece sen
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Bu blok yalnızca admin hesabında görünür. Normal ziyaretçiler
            onay bekleyen mesajları göremez.
          </p>
          <ul className="space-y-4">
            {pending.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4"
              >
                <GuestbookEntryBlock entry={entry} />
                <div className="mt-4 flex flex-wrap gap-3">
                  <form action={moderateGuestbookEntry} className="inline">
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="approved" />
                    <button
                      type="submit"
                      className="rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90"
                    >
                      Onayla
                    </button>
                  </form>
                  <form action={moderateGuestbookEntry} className="inline">
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="rejected" />
                    <button
                      type="submit"
                      className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Reddet
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Mesaj yaz</h2>
        <p className="text-xs text-muted-foreground">
          Aynı GitHub hesabı için: dakikada en fazla {limits.perMinute} gönderim,
          24 saatte en fazla {limits.perDay}.
        </p>
        <GuestbookMessageForm canWrite={canWrite} dbConfigured={dbConfigured} />
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold text-foreground">
          Yayınlanan mesajlar
        </h2>
        {approved.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/30 px-6 py-14 text-center">
            <span
              aria-hidden
              className="relative mb-5 inline-flex size-14 items-center justify-center rounded-2xl border border-signal/20 bg-signal/[0.06] text-signal/55"
            >
              <span className="absolute inset-0 animate-ping rounded-2xl bg-signal/10" />
              <svg
                className="relative size-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16v10H8l-4 3V6z" />
                <path d="M8 10h8M8 13h5" />
              </svg>
            </span>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal/70">
              guestbook.empty
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Henüz onaylı mesaj yok — ilk yazan sen ol.
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground/70">
              $ await first_message()
              <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-signal/80 align-middle" />
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {approved.map((entry) => (
              <li key={entry.id}>
                {/* Yayınlanmış mesajlar için isMod değişkenini prop olarak gönderiyoruz */}
                <GuestbookEntryBlock entry={entry} isMod={isMod} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* GİZLENEN MESAJLAR (SADECE ADMIN) */}
      {dbConfigured && isMod && rejected.length > 0 ? (
        <section className="mt-14 opacity-70 hover:opacity-100 transition-opacity">
          <h2 className="text-lg font-semibold text-red-500/80">
            Gizlenen Mesajlar (Sadece Admin)
          </h2>
          <ul className="mt-4 space-y-4">
            {rejected.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 grayscale hover:grayscale-0 transition-all"
              >
                <GuestbookEntryBlock entry={entry} isMod={false} />
                <div className="mt-4 flex flex-wrap gap-3">
                  <form action={moderateGuestbookEntry} className="inline">
                    <input type="hidden" name="id" value={entry.id} />
                    <input type="hidden" name="status" value="approved" />
                    <button
                      type="submit"
                      className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Geri Yükle (Tekrar Yayınla)
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Link
        href="/"
        className="mt-12 inline-block text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Ana sayfa
      </Link>
    </div>
  );
}