import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const prompt = await prisma.prompt.findFirst({
    where: { id, userId: user.id },
  });
  if (!prompt) {
    return NextResponse.json({ error: "Prompt introuvable" }, { status: 404 });
  }

  const token = prompt.shareToken ?? randomBytes(16).toString("hex");

  await prisma.prompt.update({
    where: { id },
    data: { shareToken: token, shareEnabled: true },
  });

  return NextResponse.json({ token, share_enabled: true });
}
