import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

import { NotificationsPopover } from "@/components/notifications-popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { Input } from "@/components/ui/input";

export function TopNav({
  title,
  subtitle,
  user,
}: {
  title: string;
  subtitle: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-xl"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        background: "rgba(6, 16, 11, 0.72)",
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
      }}
    >
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mono-xs uppercase tracking-[0.22em] text-[var(--lime)]/80">
            Smartplay
          </div>
          <h1 className="t-h2 mt-1 text-white">{title}</h1>
          <p className="mt-1 text-[0.86rem] text-white/52">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/35" />
            <Input
              className="w-full pl-9 sm:w-64 bg-white/[0.04] border-white/10 text-white placeholder:text-white/35"
              placeholder="Search athletes, goals, clips"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/app/sessions/new"
              className="group inline-flex items-center gap-1.5 rounded-[10px] border border-[var(--lime)]/28 bg-[var(--lime)]/10 px-3.5 py-2 text-[0.82rem] font-bold text-[var(--lime)] transition hover:bg-[var(--lime)]/18"
            >
              Quick log
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.6}
              />
            </Link>
            <NotificationsPopover />
            <ThemeToggle />
            <UserNav
              name={user.name ?? "User"}
              email={user.email ?? "smartplay@local"}
              image={user.image}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
