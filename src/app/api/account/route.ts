import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { deleteUserAccount } from "@/lib/account";

const deleteSchema = z.object({
  confirm: z.literal("SUPPRIMER"),
});

export async function DELETE(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Confirmation requise",
          message: 'Tapez exactement "SUPPRIMER" pour confirmer.',
        },
        { status: 400 }
      );
    }

    await deleteUserAccount(user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Impossible de supprimer le compte" }, { status: 500 });
  }
}
