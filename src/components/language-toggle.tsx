"use client";

import { useI18n } from "@/i18n/locale-provider";
import { localeSwitchEnabled, type Locale } from "@/i18n/config";

const options: { value: Locale; label: string }[] = [
  { value: "tr", label: "TR" },
  { value: "en", label: "EN" },
];

export function LanguageToggle({
  className = "",
  bare = false,
}: {
  className?: string;
  bare?: boolean;
}) {
  const { locale, setLocale, dictionary, isPending } = useI18n();

  if (!localeSwitchEnabled) return null;

  return (
    <div
      className={
        bare
          ? `inline-flex items-center ${className}`
          : `inline-flex items-center rounded-xl border border-border/80 bg-muted/40 p-0.5 ${className}`
      }
      role="group"
      aria-label={dictionary.lang.label}
    >
      {options.map((option) => {
        const active = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={isPending}
            onClick={() => setLocale(option.value)}
            aria-pressed={active}
            aria-label={
              option.value === "tr"
                ? dictionary.lang.switchToTr
                : dictionary.lang.switchToEn
            }
            className={`rounded-lg px-2 py-1 font-mono text-[0.65rem] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 ${
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
