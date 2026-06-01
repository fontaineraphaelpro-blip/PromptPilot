import { PrismaClient } from "@prisma/client";
import { TEMPLATES } from "./templates-data";
import { getInitialPlanForEmail } from "../src/lib/constants";

const prisma = new PrismaClient();

async function main() {
  const titles = TEMPLATES.map((t) => t.title);

  for (const template of TEMPLATES) {
    const existing = await prisma.template.findFirst({
      where: { title: template.title },
    });

    if (existing) {
      await prisma.template.update({
        where: { id: existing.id },
        data: template,
      });
    } else {
      await prisma.template.create({ data: template });
    }
  }

  await prisma.template.deleteMany({
    where: { title: { notIn: titles } },
  });

  console.log(`[seed] ${TEMPLATES.length} templates synchronisés (contenu expert).`);

  const adminEmail = "jeanretaz@gmail.com";
  const adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
    include: { profile: true },
  });

  if (adminUser?.profile) {
    await prisma.profile.update({
      where: { userId: adminUser.id },
      data: { plan: getInitialPlanForEmail(adminEmail) },
    });
    console.log(`[seed] Plan Creator (illimité) accordé à ${adminEmail}.`);
  } else if (adminUser) {
    await prisma.profile.create({
      data: {
        userId: adminUser.id,
        email: adminEmail,
        plan: getInitialPlanForEmail(adminEmail),
      },
    });
    console.log(`[seed] Profil Creator créé pour ${adminEmail}.`);
  } else {
    console.log(`[seed] ${adminEmail} introuvable — plan Creator sera appliqué à l'inscription.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
