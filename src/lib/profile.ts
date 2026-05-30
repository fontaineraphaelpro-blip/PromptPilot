import type { Plan } from "@/lib/constants";
import type { Profile } from "@/types";
import { createClient } from "@/lib/supabase/server";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as Profile;
}

export async function getOrCreateProfile(
  userId: string,
  email: string
): Promise<Profile> {
  const existing = await getProfile(userId);
  if (existing) return existing;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      user_id: userId,
      email,
      plan: "free" as Plan,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error("Impossible de créer le profil");
  }

  return data as Profile;
}
