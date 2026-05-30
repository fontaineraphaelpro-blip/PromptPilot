import Stripe from "stripe";
import type { Plan } from "@/lib/constants";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripeInstance;
}

export function getPriceIdForPlan(plan: "pro" | "creator"): string {
  if (plan === "pro") {
    return process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!;
  }
  return process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID!;
}

export function planFromPriceId(priceId: string): Plan {
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID) return "pro";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID) return "creator";
  return "free";
}
