/** Upgrade dans l'app (dashboard, génération) pour les comptes Free. */
export function isAppUpgradeMode(): boolean {
  return process.env.NEXT_PUBLIC_SALES_MODE !== "false";
}

/**
 * Push Pro sur le marketing (home, sticky, exit, hero secondaire).
 * Activé par défaut pour accélérer MRR. Couper : NEXT_PUBLIC_MARKETING_PRO_PUSH=false
 */
export function isMarketingProPush(): boolean {
  return process.env.NEXT_PUBLIC_MARKETING_PRO_PUSH !== "false";
}

/** @deprecated Utiliser isAppUpgradeMode ou isMarketingProPush */
export function isSalesMode(): boolean {
  return isAppUpgradeMode();
}

/** Paiements Stripe configurés côté public (Price ID ou Payment Link). */
export function isPaymentsLive(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID?.trim() ||
      process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID?.trim() ||
      process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID?.trim() ||
      process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID?.trim()
  );
}

/** Plan recommandé pour monétisation MRR (défaut Pro). */
export function recommendedPaidPlan(): "plus" {
  return "plus";
}
