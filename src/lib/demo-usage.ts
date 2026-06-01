import crypto from "node:crypto";
import { prisma } from "@/lib/db";

function todayParis(): string {
  const now = new Date();
  const paris = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  return paris.toISOString().split("T")[0];
}

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(`${ip}:promptexpert-demo`).digest("hex");
}

/** 1 démo landing / jour / IP */
export async function reserveDemoSlot(ip: string): Promise<{ allowed: boolean }> {
  const ipHash = hashIp(ip);
  const date = todayParis();

  const existing = await prisma.demoUsage.findFirst({
    where: { ipHash, date, kind: "demo" },
  });

  if (existing) return { allowed: false };

  await prisma.demoUsage.create({
    data: { ipHash, date, kind: "demo" },
  });

  return { allowed: true };
}

/** 3 améliorations publiques / jour / IP */
export async function reserveImproveSlot(ip: string, max = 3): Promise<{ allowed: boolean }> {
  const ipHash = hashIp(ip);
  const date = todayParis();

  const count = await prisma.demoUsage.count({
    where: { ipHash, date, kind: "improve" },
  });

  if (count >= max) return { allowed: false };

  await prisma.demoUsage.create({
    data: { ipHash, date, kind: "improve" },
  });

  return { allowed: true };
}
