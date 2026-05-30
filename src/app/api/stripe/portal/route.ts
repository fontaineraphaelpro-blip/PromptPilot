import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { getProfile } from "@/lib/profile";
import { getAppUrl } from "@/lib/env";

export async function POST() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const profile = await getProfile(user.id);
    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: "Aucun abonnement actif" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const appUrl = getAppUrl();

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${appUrl}/settings/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json({ error: "Erreur portail" }, { status: 500 });
  }
}
