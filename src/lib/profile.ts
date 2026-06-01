import { getInitialPlanForEmail, type Plan } from "@/lib/constants";
import type { Profile } from "@/types";
import { prisma } from "@/lib/db";
import { mapProfile } from "@/lib/mappers";

export async function getProfile(userId: string): Promise<Profile | null> {
  const row = await prisma.profile.findUnique({
    where: { userId },
  });
  return row ? mapProfile(row) : null;
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
  }
): Promise<void> {
  await prisma.profile.update({
    where: { userId },
    data: {
      ...(data.plan !== undefined && { plan: data.plan }),
      ...(data.stripeCustomerId !== undefined && {
        stripeCustomerId: data.stripeCustomerId,
      }),
      ...(data.stripeSubscriptionId !== undefined && {
        stripeSubscriptionId: data.stripeSubscriptionId,
      }),
    },
  });
}

export async function updateProfileByStripeCustomerId(
  stripeCustomerId: string,
  data: {
    plan?: Plan;
    stripeSubscriptionId?: string | null;
  }
): Promise<void> {
  await prisma.profile.updateMany({
    where: { stripeCustomerId },
    data: {
      ...(data.plan !== undefined && { plan: data.plan }),
      ...(data.stripeSubscriptionId !== undefined && {
        stripeSubscriptionId: data.stripeSubscriptionId,
      }),
    },
  });
}
