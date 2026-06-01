/** Utilitaires checkout Stripe sans SDK — utilisables côté client et serveur */

export function isStripePriceId(value: string): boolean {
  return /^price_[a-zA-Z0-9]+$/i.test(value.trim());
}

export function isStripePaymentLink(value: string): boolean {
  return /^https:\/\/(buy|billing)\.stripe\.com\//i.test(value.trim());
}

export function getPublicPlanCheckoutEnv(plan: "pro" | "creator"): string {
  const value =
    plan === "pro"
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
      : process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID;
  return value?.trim() ?? "";
}

export function buildPaymentLinkUrl(
  paymentLink: string,
  userId: string,
  plan: "pro" | "creator",
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
  plan: "pro" | "creator",
  userId: string,
  email?: string | null
): string | null {
  const value = getPublicPlanCheckoutEnv(plan);
  if (!value || !isStripePaymentLink(value)) return null;
  return buildPaymentLinkUrl(value, userId, plan, email);
}

export const CHECKOUT_API_PATH = "/api/stripe/checkout";

export function getCheckoutApiUrl(plan: "pro" | "creator"): string {
  return `${CHECKOUT_API_PATH}?plan=${plan}`;
}
