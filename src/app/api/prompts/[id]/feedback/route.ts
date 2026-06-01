import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  feedback: z.enum(["yes", "no"]),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const prompt = await prisma.prompt.findFirst({
    where: { id, userId: user.id },
  });

  if (!prompt) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }

  await prisma.prompt.update({
    where: { id },
    data: {
      copyFeedback: parsed.data.feedback,
      copyFeedbackAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}
