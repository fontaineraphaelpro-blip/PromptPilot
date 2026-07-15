import type { PaidPlan } from "@/lib/plans";
import { isPaidPlan, planFromCheckoutQuery } from "@/lib/plans";

/** Utilitaires checkout Stripe sans SDK — utilisables côté client et serveur */

export function isStripePriceId(value: string): boolean {
  return /^price_[a-zA-Z0-9]+$/i.test(value.trim());
}

export function isStripePaymentLink(value: string): boolean {
  return /^https:\/\/(buy|billing)\.stripe\.com\//i.test(value.trim());
}

/** Alias marketing « pro » → plus (affiché Pro). */
export function resolveCheckoutPlan(raw: string | null | undefined): PaidPlan | null {
  return planFromCheckoutQuery(raw);
}

export function getPublicPlanCheckoutEnv(plan: PaidPlan): string {
  if (plan === "starter") {
    return (
      process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID?.trim() ||
      // Legacy : ancien « Pro » 9€ → Starter
      process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID?.trim() ||
      ""
    );
  }
  // Pro (19€) — interne « plus »
  return (
    process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID?.trim() ||
    // Legacy : ancien Creator affiché à 19€ → Pro
    process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID?.trim() ||
    ""
  );
}

export function buildPaymentLinkUrl(
  paymentLink: string,
  userId: string,
  plan: PaidPlan,
  email?: string | null
): string {
  const url = new URL(paymentLink);
  url.searchParams.set("client_reference_id", `${userId}:${plan}`);
  if (email) {
    url.searchParams.set("prefilled_email", email);
  }
  return url.toString();
}

/** Redirection instantanée possible si Payment Link configuré (pas d'appel serveur). */
export function getInstantPaymentLinkUrl(
  plan: PaidPlan,
  userId: string,
  email?: string | null
): string | null {
  const value = getPublicPlanCheckoutEnv(plan);
  if (!value || !isStripePaymentLink(value)) return null;
  return buildPaymentLinkUrl(value, userId, plan, email);
}

export const CHECKOUT_API_PATH = "/api/stripe/checkout";

export function getCheckoutApiUrl(
  plan: PaidPlan,
  interval: "monthly" | "yearly" = "monthly"
): string {
  const params = new URLSearchParams({ plan });
  if (interval === "yearly") params.set("interval", "yearly");
  return `${CHECKOUT_API_PATH}?${params.toString()}`;
}

export function isCheckoutPlanInput(value: unknown): value is PaidPlan | "pro" {
  return (
    typeof value === "string" &&
    (isPaidPlan(value) || value === "pro")
  );
}
