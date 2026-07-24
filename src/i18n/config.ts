export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const LOCALE_COOKIE = "uc_locale";

/**
 * TR/EN geçişi şimdilik kapalı — dictionary altyapısı duruyor,
 * UI toggle ve EN locale okuması yeniden açılana kadar deaktif.
 */
export const localeSwitchEnabled = false;

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "tr" || value === "en";
}
