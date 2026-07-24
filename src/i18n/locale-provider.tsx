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
  const [optimisticLocale, setOptimisticLocale] = useState<Locale | null>(null);
  const [isPending, startTransition] = useTransition();

  const activeLocale = optimisticLocale ?? locale;
  const activeDictionary =
    activeLocale === locale ? dictionary : getDictionary(activeLocale);

  useEffect(() => {
    document.documentElement.lang = activeLocale;
  }, [activeLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (!localeSwitchEnabled || next === activeLocale) return;
      writeLocaleCookie(next);
      setOptimisticLocale(next);
      startTransition(() => {
        void setLocaleAction(next).then(() => {
          router.refresh();
        });
      });
    },
    [activeLocale, router],
  );

  // Server locale yakalayınca optimistic’i bırak (render sırasında güvenli reset)
  if (optimisticLocale !== null && optimisticLocale === locale) {
    setOptimisticLocale(null);
  }

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: activeLocale,
      dictionary: activeDictionary,
      setLocale,
      isPending,
    }),
    [activeDictionary, activeLocale, isPending, setLocale],
  );

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
