import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const [total, weekly, hourly] = await Promise.all([
      prisma.prompt.count(),
      prisma.prompt.count({
        where: { createdAt: { gte: weekAgo } },
      }),
      prisma.prompt.count({
        where: { createdAt: { gte: hourAgo } },
      }),
    ]);

    const weeklyLabel =
      weekly > 0
        ? `${weekly.toLocaleString("fr-FR")} prompts générés cette semaine`
        : "Rejoignez les premiers utilisateurs PromptPilot";

    return NextResponse.json({
      total_prompts: total,
      weekly_prompts: weekly,
      hourly_prompts: hourly,
      label: weeklyLabel,
      hourly_label:
        hourly > 0
          ? `${hourly.toLocaleString("fr-FR")} prompts dans la dernière heure`
          : null,
    });
  } catch {
    return NextResponse.json({
      total_prompts: 0,
      weekly_prompts: 0,
      hourly_prompts: 0,
      label: "PromptPilot — studio de prompts IA",
      hourly_label: null,
    });
  }
}
