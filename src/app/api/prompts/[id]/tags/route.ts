import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { canUseAdvancedGeneratorOptions } from "@/lib/generate-plan-guard";
import { getOrCreateProfile } from "@/lib/profile";

const tagsSchema = z.object({
  tags: z.array(z.string().min(1).max(30)).max(10),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const profile = await getOrCreateProfile(user.id, user.email);
  if (!canUseAdvancedGeneratorOptions(profile.plan)) {
    return NextResponse.json(
      { error: "Tags réservés au plan Pro" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const parsed = tagsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const updated = await prisma.prompt.updateMany({
    where: { id, userId: user.id },
    data: { tags: parsed.data.tags.map((t) => t.trim().toLowerCase()) },
  });

  if (updated.count === 0) {
    return NextResponse.json({ error: "Prompt introuvable" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    tags: parsed.data.tags.map((t) => t.trim().toLowerCase()),
  });
}
