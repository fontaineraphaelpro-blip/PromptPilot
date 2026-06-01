import { isLocale, LOCALE_COOKIE, LOCALE_HEADER, type Locale } from "./types";

export function getLocaleFromRequest(request: Request): Locale {
  const header = request.headers.get(LOCALE_HEADER);
  if (isLocale(header)) return header;

  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`${LOCALE_COOKIE}=(fr|en)`));
  if (match && isLocale(match[1])) return match[1];

  return "fr";
}
