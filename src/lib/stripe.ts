import Stripe from "stripe";
import type { Plan } from "@/lib/constants";
import {
  getPublicPlanCheckoutEnv,
  isStripePaymentLink,
  isStripePriceId,
} from "@/lib/stripe-checkout-url";

export {
  buildPaymentLinkUrl,
  isStripePaymentLink,
  isStripePriceId,
} from "@/lib/stripe-checkout-url";

let stripeInstance: Stripe | null = null;

export type StripePlanRef =
  | { type: "price_id"; value: string }
  | { type: "payment_link"; value: string };

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripeInstance;
}

function getRawPlanEnv(plan: "pro" | "creator", interval: "monthly" | "yearly" = "monthly"): string {
  if (interval === "yearly") {
    const yearly =
      plan === "pro"
        ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY?.trim()
        : process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID_YEARLY?.trim();
    if (yearly) return yearly;
  }
  return getPublicPlanCheckoutEnv(plan);
}

export function hasYearlyPricing(plan: "pro" | "creator"): boolean {
  const yearly =
    plan === "pro"
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY?.trim()
      : process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID_YEARLY?.trim();
  return Boolean(yearly);
}

export function hasAnyYearlyPricing(): boolean {
  return hasYearlyPricing("pro") || hasYearlyPricing("creator");
}

export function getPlanCheckoutRef(
  plan: "pro" | "creator",
  interval: "monthly" | "yearly" = "monthly"
): StripePlanRef {
  const value = getRawPlanEnv(plan, interval);
  if (!value) {
    throw new Error(`Variable Stripe manquante pour le plan ${plan}`);
  }
  if (isStripePriceId(value)) {
    return { type: "price_id", value };
  }
  if (isStripePaymentLink(value)) {
    return { type: "payment_link", value };
  }
  throw new Error(
    `Configuration Stripe invalide pour ${plan} : utilise un ID price_... ou un lien https://buy.stripe.com/...`
  );
}

/** @deprecated Préférer getPlanCheckoutRef — conservé pour compatibilité interne */
export function getPriceIdForPlan(plan: "pro" | "creator"): string {
  const ref = getPlanCheckoutRef(plan);
  if (ref.type !== "price_id") {
    throw new Error(
      `Le plan ${plan} est configuré avec un Payment Link, pas un Price ID.`
    );
  }
  return ref.value;
}

function getKnownPriceIds(plan: "pro" | "creator"): string[] {
  const ids = new Set<string>();
  const publicVal = getRawPlanEnv(plan);
  const serverVal =
    plan === "pro"
      ? process.env.STRIPE_PRO_PRICE_ID?.trim()
      : process.env.STRIPE_CREATOR_PRICE_ID?.trim();

  if (isStripePriceId(publicVal)) ids.add(publicVal);
  if (serverVal && isStripePriceId(serverVal)) ids.add(serverVal);

  return [...ids];
}

export function planFromPriceId(priceId: string): Plan {
  if (getKnownPriceIds("pro").includes(priceId)) return "pro";
  if (getKnownPriceIds("creator").includes(priceId)) return "creator";
  return "free";
}

export function parseClientReferenceId(
  ref: string | null | undefined
): { userId: string; plan: Plan } | null {
  if (!ref) return null;
  const [userId, plan] = ref.split(":");
  if (!userId) return null;
  if (plan === "pro" || plan === "creator") {
    return { userId, plan };
  }
  return { userId, plan: "free" };
}

export function stripeConfigErrorMessage(error: unknown): string | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "StripeInvalidRequestError" &&
    "param" in error &&
    error.param === "line_items[0][price]"
  ) {
    return (
      "Configuration Stripe incorrecte : NEXT_PUBLIC_STRIPE_PRO_PRICE_ID et " +
      "NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID doivent être des ID price_... " +
      "(Stripe → Produits → Tarif → ID), pas des liens buy.stripe.com. " +
      "Les Payment Links sont aussi acceptés — redéployez avec la dernière version."
    );
  }
  return null;
}
