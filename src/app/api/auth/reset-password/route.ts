import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  token: z.string().min(32),
  password: z
    .string()
    .min(8)
    .regex(/[A-Za-z]/, "Au moins une lettre")
    .regex(/[0-9]/, "Au moins un chiffre"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(parsed.data.token)
      .digest("hex");

    const row = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!row || row.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Lien expiré ou invalide. Demandez un nouveau lien." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: row.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.deleteMany({ where: { userId: row.userId } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
