import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getOrCreateProfile(user.id, user.email);

  return (
    <div className="flex min-h-dvh min-w-0 overflow-x-hidden">
      <DashboardSidebar plan={profile.plan} />
      <div className="flex min-w-0 flex-1 flex-col pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <main className="flex-1 min-w-0 overflow-x-hidden p-4 pt-[max(1rem,env(safe-area-inset-top))] sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
