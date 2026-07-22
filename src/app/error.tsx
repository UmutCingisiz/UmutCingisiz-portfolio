"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  // App Router error boundaries are client components — inject robots meta.
  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]');
    const meta =
      existing ??
      (() => {
        const el = document.createElement("meta");
        el.setAttribute("name", "robots");
        document.head.appendChild(el);
        return el;
      })();
    const previous = meta.getAttribute("content");
    meta.setAttribute("content", "noindex, nofollow");
    return () => {
      if (existing) {
        if (previous == null) meta.removeAttribute("content");
        else meta.setAttribute("content", previous);
      } else {
        meta.remove();
      }
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
        Hata
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Bir şeyler ters gitti
      </h1>
      <p className="mt-4 text-pretty text-muted-foreground">
        Sayfa yüklenirken beklenmeyen bir sorun oluştu. Tekrar deneyebilir veya
        ana sayfaya dönebilirsin.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn-signal inline-flex h-11 items-center rounded-lg px-5 text-sm font-semibold transition-opacity hover:opacity-90"
        >
          Tekrar dene
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
