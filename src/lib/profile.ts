import { getInitialPlanForEmail, type Plan } from "@/lib/constants";
import type { Profile } from "@/types";
import { prisma } from "@/lib/db";
import { mapProfile } from "@/lib/mappers";
import { normalizePlan } from "@/lib/plans";

export async function getProfile(userId: string): Promise<Profile | null> {
  const row = await prisma.profile.findUnique({
    where: { userId },
  });
  if (!row) return null;

  // Migrate legacy DB value "pro" (ancien volume 9€) → "starter"
  if (row.plan === "pro") {
    const migrated = await prisma.profile.update({
      where: { userId },
      data: { plan: "starter" },
    });
    return mapProfile(migrated);
  }

  return mapProfile(row);
}

export async function getOrCreateProfile(
  userId: string,
  email: string
): Promise<Profile> {
  const existing = await getProfile(userId);
  if (existing) return existing;

  const row = await prisma.profile.create({
    data: {
      userId,
      email,
      plan: getInitialPlanForEmail(email),
    },
  });

  return mapProfile(row);
}

export async function updateProfileByUserId(
  userId: string,
  data: {
    plan?: Plan;
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    promptCredits?: number | { increment: number } | { decrement: number };
    workflowUnlocked?: boolean;
  }
): Promise<void> {
  await prisma.profile.update({
    where: { userId },
    data: {
      ...(data.plan !== undefined && { plan: normalizePlan(data.plan) }),
      ...(data.stripeCustomerId !== undefined && {
        stripeCustomerId: data.stripeCustomerId,
      }),
      ...(data.stripeSubscriptionId !== undefined && {
        stripeSubscriptionId: data.stripeSubscriptionId,
      }),
      ...(data.promptCredits !== undefined && {
        promptCredits: data.promptCredits,
      }),
      ...(data.workflowUnlocked !== undefined && {
        workflowUnlocked: data.workflowUnlocked,
      }),
    },
  });
}

export async function updateProfileByStripeCustomerId(
  stripeCustomerId: string,
  data: {
    plan?: Plan;
    stripeSubscriptionId?: string | null;
    promptCredits?: number | { increment: number } | { decrement: number };
    workflowUnlocked?: boolean;
  }
): Promise<void> {
  await prisma.profile.updateMany({
    where: { stripeCustomerId },
    data: {
      ...(data.plan !== undefined && { plan: normalizePlan(data.plan) }),
      ...(data.stripeSubscriptionId !== undefined && {
        stripeSubscriptionId: data.stripeSubscriptionId,
      }),
      ...(data.promptCredits !== undefined && {
        promptCredits: data.promptCredits,
      }),
      ...(data.workflowUnlocked !== undefined && {
        workflowUnlocked: data.workflowUnlocked,
      }),
    },
  });
}
