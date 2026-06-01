"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMessages, t, type Messages } from "@/lib/i18n/get-messages";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/types";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  t: (path: string) => string;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const messages = useMemo(() => getMessages(locale), [locale]);

  const setLocale = useCallback((next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    setLocaleState(next);
    window.location.reload();
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      messages,
      t: (path: string) => t(messages, path),
      setLocale,
    }),
    [locale, messages, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
