import { createClient } from "@/lib/supabase/server";
import { getOrCreateProfile } from "@/lib/profile";
import { TemplateGrid } from "@/components/templates/template-grid";
import type { Template } from "@/types";

export default async function TemplatesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await getOrCreateProfile(user.id, user.email ?? "");

  const { data: templates } = await supabase
    .from("templates")
    .select("*")
    .order("category");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Templates premium</h1>
        <p className="text-muted-foreground mt-1">
          Prompts pré-écrits par catégorie. Les templates premium nécessitent le plan Pro.
        </p>
      </div>
      <TemplateGrid
        templates={(templates ?? []) as Template[]}
        plan={profile.plan}
      />
    </div>
  );
}
