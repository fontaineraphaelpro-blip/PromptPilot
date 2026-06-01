/** Mode vente : CTAs Pro, checkout home, barre sticky orientée conversion. Désactiver avec NEXT_PUBLIC_SALES_MODE=false */
export function isSalesMode(): boolean {
  return process.env.NEXT_PUBLIC_SALES_MODE !== "false";
}

/** Paiements Stripe configurés côté public (Price ID ou Payment Link). */
export function isPaymentsLive(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID?.trim() ||
      process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRICE_ID?.trim()
  );
}
