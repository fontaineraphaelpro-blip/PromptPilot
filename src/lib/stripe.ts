import Stripe from "stripe";
import type { Plan } from "@/lib/constants";
import type { PaidPlan } from "@/lib/plans";
import { isPaidPlan, normalizePlan, planFromCheckoutQuery } from "@/lib/plans";
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

function yearlyEnvFor(plan: PaidPlan): string | undefined {
  if (plan === "starter") {
    return (
      process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID_YEARLY?.trim() ||
      process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID_YEARLY?.trim()
    );
  }
  if (plan === "plus") {
    return process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID_YEARLY?.trim();
  }
  return undefined;
}

function getRawPlanEnv(plan: PaidPlan, interval: "monthly" | "yearly" = "monthly"): string {
  if (interval === "yearly") {
    const yearly = yearlyEnvFor(plan);
    if (yearly) return yearly;
  }
  return getPublicPlanCheckoutEnv(plan);
}

export function hasYearlyPricing(plan: PaidPlan): boolean {
  return Boolean(yearlyEnvFor(plan));
}

export function hasAnyYearlyPricing(): boolean {
  return hasYearlyPricing("starter") || hasYearlyPricing("plus");
}

export function getPlanCheckoutRef(
  plan: PaidPlan,
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
export function getPriceIdForPlan(plan: PaidPlan): string {
  const ref = getPlanCheckoutRef(plan);
  if (ref.type !== "price_id") {
    throw new Error(
      `Le plan ${plan} est configuré avec un Payment Link, pas un Price ID.`
    );
  }
  return ref.value;
}

function getKnownPriceIds(plan: PaidPlan): string[] {
  const ids = new Set<string>();
  const publicVal = getRawPlanEnv(plan);
  let serverVal: string | undefined;
  if (plan === "starter") {
    serverVal =
      process.env.STRIPE_STARTER_PRICE_ID?.trim() ||
      process.env.STRIPE_PRO_PRICE_ID?.trim();
  } else if (plan === "plus") {
    serverVal = process.env.STRIPE_PLUS_PRICE_ID?.trim();
  }

  if (isStripePriceId(publicVal)) ids.add(publicVal);
  if (serverVal && isStripePriceId(serverVal)) ids.add(serverVal);

  // Annuel
  const yearly = yearlyEnvFor(plan);
  if (yearly && isStripePriceId(yearly)) ids.add(yearly);

  return [...ids];
}

export function planFromPriceId(priceId: string): Plan {
  if (getKnownPriceIds("starter").includes(priceId)) return "starter";
  if (getKnownPriceIds("plus").includes(priceId)) return "plus";
  // Ancien Price ID Creator → Pro
  const legacyCreator =
    process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID?.trim() ||
    process.env.STRIPE_CREATOR_PRICE_ID?.trim();
  if (legacyCreator && legacyCreator === priceId) return "plus";
  return "free";
}

export function parseClientReferenceId(
  ref: string | null | undefined
): { userId: string; plan: Plan } | null {
  if (!ref) return null;
  const [userId, planRaw] = ref.split(":");
  if (!userId) return null;
  const fromCheckout = planFromCheckoutQuery(planRaw);
  if (fromCheckout) return { userId, plan: fromCheckout };
  if (isPaidPlan(planRaw ?? "")) return { userId, plan: planRaw as PaidPlan };
  return { userId, plan: normalizePlan(planRaw) };
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
      "Configuration Stripe incorrecte : NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID (ou PRO legacy) et " +
      "NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID doivent être des ID price_... " +
      "(Stripe → Produits → Tarif → ID), pas des liens buy.stripe.com. " +
      "Les Payment Links sont aussi acceptés — redéployez avec la dernière version."
    );
  }
  return null;
}
