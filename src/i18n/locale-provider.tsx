"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/actions/locale";
import { localeSwitchEnabled, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (next: Locale) => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function writeLocaleCookie(locale: Locale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [clientLocale, setClientLocale] = useState(locale);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setClientLocale(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (!localeSwitchEnabled || next === clientLocale) return;
      writeLocaleCookie(next);
      setClientLocale(next);
      document.documentElement.lang = next;
      startTransition(() => {
        void setLocaleAction(next).then(() => {
          router.refresh();
        });
      });
    },
    [clientLocale, router],
  );

  const value = useMemo<LocaleContextValue>(() => {
    const dict =
      clientLocale === locale ? dictionary : getDictionary(clientLocale);
    return {
      locale: clientLocale,
      dictionary: dict,
      setLocale,
      isPending,
    };
  }, [clientLocale, dictionary, isPending, locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return ctx;
}
