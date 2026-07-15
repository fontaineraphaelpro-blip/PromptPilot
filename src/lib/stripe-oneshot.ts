import type { OneShotProductId, CreditPackId } from "@/lib/commerce-products";
import {
  CREDIT_PACKS,
  EXPERT_UNLOCK,
  WORKFLOW_PACK_UNLOCK,
  getCreditPack,
} from "@/lib/commerce-products";
import { isStripePriceId } from "@/lib/stripe-checkout-url";
import type Stripe from "stripe";

export type OneShotCheckoutProduct = OneShotProductId;

const CREDIT_ENV: Record<CreditPackId, string | undefined> = {
  credits_10: process.env.NEXT_PUBLIC_STRIPE_CREDITS_10_PRICE_ID,
  credits_30: process.env.NEXT_PUBLIC_STRIPE_CREDITS_30_PRICE_ID,
  credits_100: process.env.NEXT_PUBLIC_STRIPE_CREDITS_100_PRICE_ID,
};

/** Optional override if you already created Stripe Prices — otherwise unused. */
export function getOneShotPriceIdOptional(
  product: OneShotProductId
): string | null {
  let value: string | undefined;
  if (product === EXPERT_UNLOCK.id) {
    value =
      process.env.NEXT_PUBLIC_STRIPE_EXPERT_UNLOCK_PRICE_ID?.trim() ||
      process.env.STRIPE_EXPERT_UNLOCK_PRICE_ID?.trim();
  } else if (product === WORKFLOW_PACK_UNLOCK.id) {
    value =
      process.env.NEXT_PUBLIC_STRIPE_WORKFLOW_PACK_PRICE_ID?.trim() ||
      process.env.STRIPE_WORKFLOW_PACK_PRICE_ID?.trim();
  } else if (product === "credits_10") {
    value =
      CREDIT_ENV.credits_10?.trim() ||
      process.env.STRIPE_CREDITS_10_PRICE_ID?.trim();
  } else if (product === "credits_30") {
    value =
      CREDIT_ENV.credits_30?.trim() ||
      process.env.STRIPE_CREDITS_30_PRICE_ID?.trim();
  } else {
    value =
      CREDIT_ENV.credits_100?.trim() ||
      process.env.STRIPE_CREDITS_100_PRICE_ID?.trim();
  }

  if (!value || !isStripePriceId(value)) return null;
  return value;
}

/** @deprecated Prefer price_data via getOneShotLineItem — kept for legacy callers */
export function getOneShotPriceId(product: OneShotProductId): string {
  const id = getOneShotPriceIdOptional(product);
  if (!id) {
    throw new Error(
      `Variable Stripe manquante ou invalide pour le produit one-shot « ${product} »`
    );
  }
  return id;
}

export function getOneShotCatalog(product: OneShotProductId): {
  name: string;
  description: string;
  amountEuros: number;
} {
  if (product === EXPERT_UNLOCK.id) {
    return {
      name: EXPERT_UNLOCK.title,
      description: EXPERT_UNLOCK.description,
      amountEuros: EXPERT_UNLOCK.amountEuros,
    };
  }
  if (product === WORKFLOW_PACK_UNLOCK.id) {
    return {
      name: WORKFLOW_PACK_UNLOCK.title,
      description: WORKFLOW_PACK_UNLOCK.description,
      amountEuros: WORKFLOW_PACK_UNLOCK.amountEuros,
    };
  }
  const pack = getCreditPack(product);
  if (!pack) {
    throw new Error(`Produit one-shot inconnu : ${product}`);
  }
  return {
    name: pack.title,
    description: pack.description,
    amountEuros: pack.amountEuros,
  };
}

/** cents, EUR — from commerce-products (single source of truth) */
export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}

/**
 * Checkout line item: uses existing price_… if configured, otherwise
 * Stripe `price_data` (no Dashboard product needed).
 */
export function getOneShotLineItem(
  product: OneShotProductId
): Stripe.Checkout.SessionCreateParams.LineItem {
  const existing = getOneShotPriceIdOptional(product);
  if (existing) {
    return { price: existing, quantity: 1 };
  }

  const catalog = getOneShotCatalog(product);
  return {
    quantity: 1,
    price_data: {
      currency: "eur",
      unit_amount: eurosToCents(catalog.amountEuros),
      product_data: {
        name: `PromptPilot — ${catalog.name}`,
        description: catalog.description,
        metadata: { oneshot_product: product },
      },
    },
  };
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

export function isCreditPackProduct(
  product: OneShotProductId
): product is CreditPackId {
  return Boolean(getCreditPack(product));
}
