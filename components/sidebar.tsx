"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CalendarRange,
  Flag,
  HeartPulse,
  LayoutDashboard,
  MessageSquareMore,
  Salad,
  Settings,
  ShieldCheck,
  Trophy,
  Video,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type { AppRole } from "@/types/domain";

const iconMap = {
  Dashboard: LayoutDashboard,
  Sessions: Activity,
  Analytics: Trophy,
  Goals: Flag,
  Nutrition: Salad,
  Wellness: HeartPulse,
  Mental: MessageSquareMore,
  Videos: Video,
  Calendar: CalendarRange,
  Profile: ShieldCheck,
  Settings: Settings,
  Overview: LayoutDashboard,
  Team: ShieldCheck,
  Plans: Flag,
  Reviews: Video,
  Athlete: ShieldCheck,
  Admin: ShieldCheck,
} as const;

export function Sidebar({
  role,
  links,
}: {
  role: AppRole;
  links: Array<{ label: string; href: string }>;
}) {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-72 shrink-0 flex-col border-r p-5 lg:flex"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        background:
          "linear-gradient(180deg, rgba(6,16,11,0.9) 0%, rgba(8,22,18,0.88) 100%)",
      }}
    >
      <Link href="/" className="group flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-[12px] bg-[var(--lime)] text-lg font-black text-[var(--pitch)] transition group-hover:scale-[1.04]">
          SP
        </div>
        <div>
          <div className="font-display text-[1.15rem] font-semibold text-white">
            Smartplay
          </div>
          <div className="mono-xs uppercase tracking-[0.22em] text-[var(--lime)]/75">
            Athlete OS
          </div>
        </div>
      </Link>

      <div className="mt-8 flex items-center gap-2">
        <Badge>{role}</Badge>
        <Badge variant="secondary">Live</Badge>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {links.map((link) => {
          const Icon =
            iconMap[link.label as keyof typeof iconMap] ?? LayoutDashboard;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-[0.88rem] font-medium transition-colors",
                active
                  ? "bg-[var(--lime)] text-[var(--pitch)]"
                  : "text-white/62 hover:bg-white/5 hover:text-white",
              )}
            >
              {/* Active-state pip */}
              {active ? null : (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 scale-y-0 rounded-r-full bg-[var(--lime)] transition-transform duration-300 group-hover:scale-y-100"
                />
              )}
              <Icon className="size-4" strokeWidth={active ? 2.4 : 2} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[18px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/0 p-5">
        <div className="mono-xs uppercase tracking-[0.22em] text-[var(--lime)]/75">
          Access-first
        </div>
        <p className="mt-3 text-[0.82rem] leading-6 text-white/62">
          Equipment-light drills, budget meals, and home-session planning are
          built into the workflow — not bolted on.
        </p>
      </div>
    </aside>
  );
}
