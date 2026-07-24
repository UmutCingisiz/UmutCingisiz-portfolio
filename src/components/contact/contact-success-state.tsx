import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type Props = {
  onReset?: () => void;
};

/**
 * Form gönderildikten sonra — form DOM’da yok; double-submit imkânsız.
 */
export function ContactSuccessState({ onReset }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/[0.06] px-5 py-8 text-center sm:px-8 sm:py-10"
    >
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-emerald-400/35 bg-emerald-400/10 text-emerald-300">
        <svg
          className="size-5"
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
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        Teşekkürler, mesajınız alındı
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        En kısa sürede dönüş yapacağım. Acil bir konuysa doğrudan{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {siteConfig.email}
        </a>{" "}
        adresine yazabilirsiniz.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <Link
          href="/projects"
          className="inline-flex h-10 items-center rounded-lg border border-border bg-card/60 px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Projelere dön
        </Link>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Yeni mesaj yaz
          </button>
        ) : null}
      </div>
    </div>
  );
}
