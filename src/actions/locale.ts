"use server";

import { cookies } from "next/headers";
import {
  isLocale,
  localeSwitchEnabled,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

export async function setLocaleAction(locale: Locale) {
  if (!localeSwitchEnabled || !isLocale(locale)) return;
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
