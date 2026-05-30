import { PrismaClient } from "@prisma/client";
import { TEMPLATES } from "./templates-data";

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
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
