import type { NextRequest } from "next/server";
import { isLocale, type Locale } from "./types";

const FRENCH_COUNTRIES = new Set([
  "FR",
  "GF",
  "GP",
  "MQ",
  "RE",
  "YT",
  "PM",
  "BL",
  "MF",
  "NC",
  "WF",
  "PF",
]);

/** Langue préférée du navigateur (première entrée Accept-Language). */
function primaryAcceptLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "";
  const first = acceptLanguage.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.split(";")[0] ?? "";
}

/**
 * FR : cookie explicite, navigateur fr*, ou IP en France / DOM-TOM.
 * Sinon EN (visiteurs internationaux).
 */
export function detectLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get("pp_locale")?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const primary = primaryAcceptLanguage(request.headers.get("accept-language"));
  if (primary.startsWith("fr")) return "fr";

  const country =
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cloudfront-viewer-country") ??
    "";
  if (country && FRENCH_COUNTRIES.has(country.toUpperCase())) return "fr";

  if (primary.startsWith("en")) return "en";

  return country ? "en" : "en";
}

/** Langue des prompts générés par l’API. */
export function localeToPromptLanguage(locale: Locale): "Français" | "Anglais" {
  return locale === "en" ? "Anglais" : "Français";
}
