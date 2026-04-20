"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  UserSquare,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/marketing/motion-primitives";

type Role = {
  role: string;
  icon: LucideIcon;
  sees: string;
  detail: string;
  notBoundary: string; // explicit: what this role does NOT see
};

const ROLES: Role[] = [
  {
    role: "Athlete",
    icon: Target,
    sees: "Their week. Their work. Their next adjustment.",
    detail:
      "Log, review, recover, fuel, reflect, and build a recruiting-ready profile they actually own.",
    notBoundary: "No one else publishes on their behalf.",
  },
  {
    role: "Coach",
    icon: Users,
    sees: "Roster readiness, submitted clips, drill assignments.",
    detail:
      "Trend-aware, comment-ready, with no surveillance of personal recovery details.",
    notBoundary: "No raw wellness diaries or mindset journals.",
  },
  {
    role: "Parent",
    icon: ShieldCheck,
    sees: "Big-picture schedule and recovery cues.",
    detail:
      "Supportive visibility — not the coach view. Boundaries are explicit.",
    notBoundary: "No coach↔athlete threads or private notes.",
  },
  {
    role: "Admin",
    icon: UserSquare,
    sees: "Adoption, program health, risk flags.",
    detail:
      "Operational signal at the program level for schools, clubs, and nonprofits.",
    notBoundary: "No individual athlete data without consent.",
  },
];

export function FeaturesRoleArchitecture() {
  const reduceMotion = useReducedMotion();

  return (
    <section data-surface="dark" className="surface-pitch-gradient section-pad">
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="kicker kicker-lime">Role architecture</div>
              <h2 className="t-display-sm mt-5 max-w-[18ch] text-balance text-white">
                The same week. Four different responsibilities.
              </h2>
              <p className="t-lede mt-6 max-w-md text-pretty text-white/62">
                Smartplay keeps role boundaries explicit — so the product feels
                useful to coaches and parents without making the athlete feel
                watched from every direction.
              </p>
            </Reveal>
          </div>

          <div className="space-y-3">
            {ROLES.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.role}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[var(--lime)]/30 hover:bg-white/[0.05] sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-[var(--lime)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />

                  <div className="flex items-baseline justify-between gap-6">
                    <div className="flex items-baseline gap-4">
                      <span className="mono-xs uppercase text-white/38">
                        0{i + 1}
                      </span>
                      <span className="t-h3 text-[1.85rem] text-white">
                        {r.role}
                      </span>
                    </div>
                    <Icon
                      className="size-5 text-white/40 transition group-hover:text-[var(--lime)]"
                      strokeWidth={2}
                    />
                  </div>

                  <div className="mt-4 grid gap-1 sm:grid-cols-[1fr_1.4fr] sm:gap-8">
                    <div className="text-[0.92rem] font-semibold text-white">
                      {r.sees}
                    </div>
                    <div className="text-[0.9rem] leading-7 text-white/60">
                      {r.detail}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/8 bg-[var(--pitch)]/60 px-3 py-2 text-[0.78rem] text-white/62">
                    <span className="mono-xs uppercase text-[var(--lime)]/80">
                      doesn&apos;t see
                    </span>
                    <span>— {r.notBoundary}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
