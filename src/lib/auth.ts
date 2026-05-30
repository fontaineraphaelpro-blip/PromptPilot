import { auth } from "@/auth";

export interface AuthUser {
  id: string;
  email: string;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) return null;
  return {
    id: session.user.id,
    email: session.user.email,
  };
}
