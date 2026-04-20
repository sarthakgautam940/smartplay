"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { roleNavigation } from "@/lib/constants";
import type { AppRole } from "@/types/domain";

export function AppShell({
  role,
  user,
  children,
}: {
  role?: AppRole;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const sessionRole = session?.user?.role as AppRole | undefined;
  const activeRole = role ?? sessionRole ?? "athlete";
  const activeUser = user ?? {
    name: session?.user?.name ?? "Smartplay athlete",
    email: session?.user?.email,
    image: session?.user?.image,
  };

  const titleMap: Record<string, { title: string; subtitle: string }> = {
    "/app/dashboard": {
      title: "This week",
      subtitle: "The rhythm behind the work — one screen, not eight tabs.",
    },
    "/app/coach": {
      title: "Roster",
      subtitle: "Readiness, submitted clips, and the next coaching decision.",
    },
    "/app/parent": {
      title: "Family view",
      subtitle: "Support without taking over. Calendar, recovery, and room to ask.",
    },
    "/app/admin": {
      title: "Program snapshot",
      subtitle: "Adoption, program health, and where support is needed now.",
    },
  };

  const titleEntry =
    Object.entries(titleMap).find(([path]) => pathname.startsWith(path))?.[1] ?? {
      title: "Workspace",
      subtitle: "Performance, wellness, and mindset in one place.",
    };

  return (
    <div
      className="flex min-h-screen text-[var(--on-pitch-1)]"
      style={{
        background:
          "radial-gradient(120% 60% at 100% 0%, rgba(181,255,93,0.05) 0%, transparent 55%), linear-gradient(180deg, #06100b 0%, #081712 100%)",
      }}
    >
      <Sidebar role={activeRole} links={roleNavigation[activeRole]} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav
          title={titleEntry.title}
          subtitle={titleEntry.subtitle}
          user={activeUser}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
