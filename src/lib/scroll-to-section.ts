export type HomeSectionId = "funnel" | "how" | "demo" | "examples" | "pricing";

const SCROLL_TARGET_KEY = "pp_scroll_target";

const VALID_SECTIONS = new Set<HomeSectionId>([
  "funnel",
  "how",
  "demo",
  "examples",
  "pricing",
]);

export function isHomeSectionId(value: string): value is HomeSectionId {
  return VALID_SECTIONS.has(value as HomeSectionId);
}

export function setScrollTarget(id: HomeSectionId): void {
  sessionStorage.setItem(SCROLL_TARGET_KEY, id);
}

export function consumeScrollTarget(): HomeSectionId | null {
  const value = sessionStorage.getItem(SCROLL_TARGET_KEY);
  sessionStorage.removeItem(SCROLL_TARGET_KEY);
  if (value && isHomeSectionId(value)) return value;
  return null;
}

export function scrollToSection(
  id: HomeSectionId,
  behavior: ScrollBehavior = "smooth"
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

/** Retire #section de la barre d’adresse sans recharger. */
export function stripHashFromUrl(): void {
  const { pathname, search } = window.location;
  if (!window.location.hash) return;
  history.replaceState(null, "", `${pathname}${search}`);
}
