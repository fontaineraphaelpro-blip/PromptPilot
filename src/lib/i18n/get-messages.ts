import type { Locale } from "./types";
import { messages as fr } from "./messages/fr";
import { messages as en } from "./messages/en";

const catalogs = { fr, en } as const;

export type Messages = typeof fr | typeof en;

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}

export function t(messages: Messages, path: string): string {
  const keys = path.split(".");
  let current: unknown = messages;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}
