import { getAppUrl } from "@/lib/env";

/** URL absolue du logo carré (Google Search, schema.org, réseaux sociaux). */
export function getBrandLogoUrl(): string {
  return `${getAppUrl()}/apple-icon`;
}

export function getBrandIconSvgUrl(): string {
  return `${getAppUrl()}/icon.svg`;
}
