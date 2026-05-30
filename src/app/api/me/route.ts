import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { checkUsageLimit } from "@/lib/usage";
import { isOpenAIConfigured } from "@/lib/env";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const profile = await getOrCreateProfile(user.id, user.email);
  const usage = await checkUsageLimit(user.id, profile.plan);

  return NextResponse.json({
    email: profile.email,
    plan: profile.plan,
    usage,
    services: {
      openai: isOpenAIConfigured(),
    },
  });
}
