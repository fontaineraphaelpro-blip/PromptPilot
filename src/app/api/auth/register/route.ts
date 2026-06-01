import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getInitialPlanForEmail } from "@/lib/constants";
import { safeErrorMessage } from "@/lib/api-error";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`register:${ip}`, 5, 60 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${rate.retryAfterSec}s.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();

    const emailRate = checkRateLimit(`register-email:${email}`, 3, 24 * 60 * 60 * 1000);
    if (!emailRate.allowed) {
      return NextResponse.json(
        { error: "Trop de comptes créés avec cet email. Contactez le support." },
        { status: 429 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    await prisma.user.create({
      data: {
        email,
        passwordHash,
        profile: {
          create: {
            email,
            plan: getInitialPlanForEmail(email),
          },
        },
      },
    });

    void sendWelcomeEmail(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        error: safeErrorMessage(
          error,
          "Erreur lors de la création du compte"
        ),
      },
      { status: 500 }
    );
  }
}
