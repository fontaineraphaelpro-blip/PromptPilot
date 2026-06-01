export const TEMPLATE_PREFILL_KEY = "promptpilot_template_prefill";

export interface TemplatePrefill {
  userIdea: string;
  targetAI: string;
  templateTitle: string;
  savedAt: number;
}

export function saveTemplatePrefill(data: Omit<TemplatePrefill, "savedAt">) {
  if (typeof window === "undefined") return;
  const payload: TemplatePrefill = { ...data, savedAt: Date.now() };
  sessionStorage.setItem(TEMPLATE_PREFILL_KEY, JSON.stringify(payload));
}

export function getTemplatePrefill(): TemplatePrefill | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(TEMPLATE_PREFILL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TemplatePrefill;
  } catch {
    return null;
  }
}

export function clearTemplatePrefill() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TEMPLATE_PREFILL_KEY);
}
