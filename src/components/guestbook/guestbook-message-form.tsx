"use client";

import { useActionState } from "react";

import type { GuestbookMessageState } from "@/app/guestbook/actions";
import { submitGuestbookMessage } from "@/app/guestbook/actions";

type Props = {
  canWrite: boolean;
  dbConfigured: boolean;
};

export function GuestbookMessageForm({ canWrite, dbConfigured }: Props) {
  const [state, action, pending] = useActionState<
    GuestbookMessageState | null,
    FormData
  >(submitGuestbookMessage, null);

  if (!dbConfigured) {
    return (
      <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
        Veritabanı yapılmadı — `DATABASE_URL` ekle ve{" "}
        <code className="rounded bg-muted px-1 font-mono text-xs">
          scripts/guestbook-schema.sql
        </code>{" "}
        dosyasını Neon&apos;da çalıştır.
      </p>
    );
  }

  if (!canWrite) {
    return (
      <p className="text-sm text-muted-foreground">
        Mesaj yazmak için GitHub ile giriş yap.
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label
          htmlFor="guestbook-message"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Mesajın
        </label>
        <textarea
          id="guestbook-message"
          name="message"
          required
          minLength={1}
          maxLength={2000}
          rows={4}
          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground/30 focus:ring-1 focus:ring-ring"
          placeholder="Kısa ve nazik bir not bırak…"
        />
        {state?.ok === false ? (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {state.error}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? "Gönderiliyor…" : "Moderasyon için gönder"}
      </button>
    </form>
  );
}
