import type { OneShotProductId, CreditPackId } from "@/lib/commerce-products";
import {
  CREDIT_PACKS,
  EXPERT_UNLOCK,
  WORKFLOW_PACK_UNLOCK,
  getCreditPack,
} from "@/lib/commerce-products";
import { isStripePriceId } from "@/lib/stripe-checkout-url";

export type OneShotCheckoutProduct = OneShotProductId;

const CREDIT_ENV: Record<CreditPackId, string | undefined> = {
  credits_10: process.env.NEXT_PUBLIC_STRIPE_CREDITS_10_PRICE_ID,
  credits_30: process.env.NEXT_PUBLIC_STRIPE_CREDITS_30_PRICE_ID,
  credits_100: process.env.NEXT_PUBLIC_STRIPE_CREDITS_100_PRICE_ID,
};

export function getOneShotPriceId(product: OneShotProductId): string {
  let value: string | undefined;
  if (product === EXPERT_UNLOCK.id) {
    value = process.env.NEXT_PUBLIC_STRIPE_EXPERT_UNLOCK_PRICE_ID?.trim();
  } else if (product === WORKFLOW_PACK_UNLOCK.id) {
    value = process.env.NEXT_PUBLIC_STRIPE_WORKFLOW_PACK_PRICE_ID?.trim();
  } else {
    value = CREDIT_ENV[product]?.trim();
  }

  if (!value || !isStripePriceId(value)) {
    throw new Error(
      `Variable Stripe manquante ou invalide pour le produit one-shot « ${product} »`
    );
  }
  return value;
}

export function isOneShotProductId(value: unknown): value is OneShotProductId {
  if (typeof value !== "string") return false;
  if (value === EXPERT_UNLOCK.id || value === WORKFLOW_PACK_UNLOCK.id) return true;
  return CREDIT_PACKS.some((p) => p.id === value);
}

export function oneShotProductFromPriceId(
  priceId: string
): OneShotProductId | null {
  const pairs: Array<[OneShotProductId, string | undefined]> = [
    ["credits_10", process.env.NEXT_PUBLIC_STRIPE_CREDITS_10_PRICE_ID?.trim()],
    ["credits_30", process.env.NEXT_PUBLIC_STRIPE_CREDITS_30_PRICE_ID?.trim()],
    ["credits_100", process.env.NEXT_PUBLIC_STRIPE_CREDITS_100_PRICE_ID?.trim()],
    [
      EXPERT_UNLOCK.id,
      process.env.NEXT_PUBLIC_STRIPE_EXPERT_UNLOCK_PRICE_ID?.trim(),
    ],
    [
      WORKFLOW_PACK_UNLOCK.id,
      process.env.NEXT_PUBLIC_STRIPE_WORKFLOW_PACK_PRICE_ID?.trim(),
    ],
    // Server-side fallbacks (optional)
    ["credits_10", process.env.STRIPE_CREDITS_10_PRICE_ID?.trim()],
    ["credits_30", process.env.STRIPE_CREDITS_30_PRICE_ID?.trim()],
    ["credits_100", process.env.STRIPE_CREDITS_100_PRICE_ID?.trim()],
    [EXPERT_UNLOCK.id, process.env.STRIPE_EXPERT_UNLOCK_PRICE_ID?.trim()],
    [WORKFLOW_PACK_UNLOCK.id, process.env.STRIPE_WORKFLOW_PACK_PRICE_ID?.trim()],
  ];

  for (const [product, id] of pairs) {
    if (id && id === priceId) return product;
  }
  return null;
}

export function creditsForProduct(product: OneShotProductId): number {
  const pack = getCreditPack(product);
  return pack?.credits ?? 0;
}

export function isCreditPackProduct(product: OneShotProductId): product is CreditPackId {
  return Boolean(getCreditPack(product));
}
