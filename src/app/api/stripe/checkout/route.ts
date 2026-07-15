import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getAppUrl } from "@/lib/env";
import type { PaidPlan } from "@/lib/plans";
import { planFromCheckoutQuery } from "@/lib/plans";
import { stripeConfigErrorMessage } from "@/lib/stripe";
import { createCheckoutUrl } from "@/lib/stripe-checkout-server";
import { isCheckoutPlanInput } from "@/lib/stripe-checkout-url";

function resolvePlan(raw: unknown): PaidPlan | null {
  if (!isCheckoutPlanInput(raw)) return null;
  return planFromCheckoutQuery(raw);
}

function loginRedirect(plan: PaidPlan) {
  return NextResponse.redirect(
    new URL(`/login?redirect=/pricing&plan=${plan}`, getAppUrl())
  );
}

function pricingErrorRedirect() {
  return NextResponse.redirect(
    new URL("/pricing?checkout=error", getAppUrl())
  );
}

function parseInterval(value: string | null): "monthly" | "yearly" {
  return value === "yearly" ? "yearly" : "monthly";
}

async function handleCheckout(plan: PaidPlan, interval: "monthly" | "yearly") {
  const user = await getAuthUser();

  if (!user) {
    return loginRedirect(plan);
  }

  try {
    const url = await createCheckoutUrl(user, plan, interval);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Checkout error:", error);
    return pricingErrorRedirect();
  }
}

/** Redirection directe vers Stripe — le navigateur part immédiatement au clic. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const plan = resolvePlan(searchParams.get("plan"));
  const interval = parseInterval(searchParams.get("interval"));

  if (!plan) {
    return pricingErrorRedirect();
  }

  return handleCheckout(plan, interval);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = resolvePlan(body?.plan);

    if (!plan) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const interval = parseInterval(
      typeof body?.interval === "string" ? body.interval : null
    );
    const url = await createCheckoutUrl(user, plan, interval);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);
    const configMessage = stripeConfigErrorMessage(error);
    return NextResponse.json(
      {
        error: configMessage ?? "Erreur checkout",
        message: configMessage,
      },
      { status: configMessage ? 503 : 500 }
    );
  }
}
