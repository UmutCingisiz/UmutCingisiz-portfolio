"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/locale-provider";

type Props = {
  onReset?: () => void;
};

/**
 * Form gönderildikten sonra — form DOM’da yok; double-submit imkânsız.
 */
export function ContactSuccessState({ onReset }: Props) {
  const { dictionary } = useI18n();
  const t = dictionary.contact.success;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 rounded-2xl border-2 border-emerald-400/40 bg-emerald-500/[0.1] px-5 py-10 text-center shadow-[0_0_0_1px_rgba(52,211,153,0.12)] sm:mt-6 sm:px-8 sm:py-12"
    >
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-emerald-400/45 bg-emerald-400/15 text-emerald-300 sm:size-16">
        <svg
          className="size-6 sm:size-7"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8.5 6.5 12 13 4" />
        </svg>
      </span>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {t.title}
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-foreground/75 sm:text-sm sm:leading-6 sm:text-muted-foreground">
        {t.body}
      </p>
      <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="btn-signal inline-flex h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all duration-200 sm:h-11 sm:w-auto"
          >
            {t.writeAnother}
          </button>
        ) : null}
        <Link
          href="/projects"
          className="btn-outline-rise inline-flex h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all duration-200 sm:h-11 sm:w-auto"
        >
          {t.backToProjects}
        </Link>
      </div>
    </div>
  );
}
