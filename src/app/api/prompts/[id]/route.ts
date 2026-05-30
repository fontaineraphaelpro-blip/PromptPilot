import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { safeErrorMessage } from "@/lib/api-error";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const deleted = await prisma.prompt.deleteMany({
      where: { id, userId: user.id },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Prompt introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete prompt error:", error);
    return NextResponse.json(
      { error: safeErrorMessage(error, "Erreur suppression") },
      { status: 500 }
    );
  }
}
