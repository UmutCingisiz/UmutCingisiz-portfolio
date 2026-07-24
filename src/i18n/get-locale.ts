import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  localeSwitchEnabled,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

export async function getRequestLocale(): Promise<Locale> {
  if (!localeSwitchEnabled) return defaultLocale;

  const store = await cookies();
  const raw = store.get(LOCALE_COOKIE)?.value;
  return isLocale(raw) ? raw : defaultLocale;
}
