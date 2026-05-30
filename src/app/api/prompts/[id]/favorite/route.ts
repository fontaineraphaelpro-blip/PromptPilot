import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { safeErrorMessage } from "@/lib/api-error";

const bodySchema = z.object({
  is_favorite: z.boolean(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const updated = await prisma.prompt.updateMany({
      where: { id, userId: user.id },
      data: { isFavorite: parsed.data.is_favorite },
    });

    if (updated.count === 0) {
      return NextResponse.json({ error: "Prompt introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Favorite error:", error);
    return NextResponse.json(
      { error: safeErrorMessage(error, "Erreur mise à jour favori") },
      { status: 500 }
    );
  }
}
