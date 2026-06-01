"use client";

import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, messages } = useLocale();
  const other: Locale = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      onClick={() => setLocale(other)}
      className={cn(
        "shrink-0 rounded-md border border-white/15 px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-white/30 hover:text-foreground",
        className
      )}
      aria-label={messages.lang.switchTo}
      title={messages.lang.switchTo}
    >
      {messages.lang.label}
    </button>
  );
}
