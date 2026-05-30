import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { prisma } from "@/lib/db";
import { mapTemplate } from "@/lib/mappers";
import { TemplateGrid } from "@/components/templates/template-grid";

export default async function TemplatesPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email ?? "");

  const rows = await prisma.template.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Templates premium</h1>
        <p className="text-muted-foreground mt-1">
          Prompts pré-écrits par catégorie. Les templates premium nécessitent le plan Pro.
        </p>
      </div>
      <TemplateGrid templates={rows.map(mapTemplate)} plan={profile.plan} />
    </div>
  );
}
