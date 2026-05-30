const ADAPT_KEY = "promptpilot_adapt_prefill";

export interface AdaptPrefill {
  userIdea: string;
  targetAI: string;
  taskType: string;
  sourceTitle: string;
}

export function saveAdaptPrefill(data: AdaptPrefill) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ADAPT_KEY, JSON.stringify(data));
}

export function getAdaptPrefill(): AdaptPrefill | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ADAPT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdaptPrefill;
  } catch {
    return null;
  }
}

export function clearAdaptPrefill() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ADAPT_KEY);
}
