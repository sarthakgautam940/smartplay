"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ShieldCheck, Target, Users } from "lucide-react";
import { useRef, useState } from "react";

import { AthleteLensWidget } from "@/components/marketing/role-lens/athlete-widget";
import { CoachLensWidget } from "@/components/marketing/role-lens/coach-widget";
import { ParentLensWidget } from "@/components/marketing/role-lens/parent-widget";

/**
 * Chapter 2 — Three lenses.
 *
 * Pin-scroll: the outer section is ~260vh tall; the inner stage is
 * position: sticky through that range. Inside the pin window, scroll
 * progress composes three role cards one at a time (Athlete → Coach →
 * Parent). After the third settles, the pin releases and the next
 * section takes over.
 *
 * Hover (desktop, pointer: fine): expands a single card horizontally
 * via a grid-template-columns transition on the parent. The expanded
 * card reveals its purpose-built widget; the heading column dims behind
 * a mask. Unhover reverses smoothly. Hover is disabled until the third
 * card has fully composed (scrollProgress ≥ 0.92) so the compose and
 * expand affordances don't fight each other.
 */

type Role = "athlete" | "coach" | "parent";

const ROLES: Array<{
  id: Role;
  label: string;
  icon: typeof Target;
  line: string;
  detail: string;
  cue: string;
  hoverLabel: string;
}> = [
  {
    id: "athlete",
    label: "Athlete",
    icon: Target,
    line: "Know the next useful rep.",
    detail:
      "Sessions, recovery, nutrition, mindset, goals, and film tied to the week actually being lived — not a copy-pasted plan.",
    cue: "Start the trial",
    hoverLabel: "Open the athlete view",
  },
  {
    id: "coach",
    label: "Coach",
    icon: Users,
    line: "Scan the roster without noise.",
    detail:
      "Readiness, submitted clips, session trends, and drill assignments surface where the 12 minutes a week actually go.",
    cue: "Pilot team workflows",
    hoverLabel: "Open the coach view",
  },
  {
    id: "parent",
    label: "Parent",
    icon: ShieldCheck,
    line: "Support without taking over.",
    detail:
      "High-level schedule and recovery cues, explicit boundaries on what you don't see — the athlete's data stays with the athlete.",
    cue: "Trust the big picture",
    hoverLabel: "Open the parent view",
  },
];

// Scroll thresholds for each card's appearance (0→1 across the pin window)
const ENTRY_RANGES: Record<Role, [number, number]> = {
  athlete: [0.05, 0.22],
  coach: [0.32, 0.52],
  parent: [0.62, 0.82],
};

// Once all three are composed we release hover-gating
const HOVER_RELEASE = 0.92;

export function RoleLensSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [hoverReady, setHoverReady] = useState(false);
  const [expanded, setExpanded] = useState<Role | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHoverReady(v >= HOVER_RELEASE);
  });

  return (
    <section
      ref={sectionRef}
      data-surface="light"
      className="surface-chalk relative"
      style={{
        // Pin window: 260vh on desktop collapsed to natural flow on mobile
        minHeight: reduceMotion ? "auto" : "260vh",
      }}
    >
      <div className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="section-shell flex h-full items-center section-pad md:section-pad-sm">
          <div className="grid w-full gap-12 md:grid-cols-[0.72fr_1.28fr] md:items-center md:gap-10">
            {/* LEFT — sticky heading column */}
            <HeadingColumn expanded={expanded} />

            {/* RIGHT — composed three-card lens grid */}
            <div
              className="lens-grid"
              data-expanded={hoverReady ? expanded ?? "" : ""}
            >
              {ROLES.map((role) => (
                <LensCard
                  key={role.id}
                  role={role}
                  scrollYProgress={scrollYProgress}
                  entryRange={ENTRY_RANGES[role.id]}
                  hoverReady={hoverReady}
                  expanded={expanded}
                  onHover={(hovering) => setExpanded(hovering ? role.id : null)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Heading column — fades when a lens is expanded on desktop.
   ────────────────────────────────────────────────────────────── */
function HeadingColumn({ expanded }: { expanded: Role | null }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={{
        opacity: reduceMotion ? 1 : expanded ? 0.12 : 1,
        filter: reduceMotion ? "none" : expanded ? "blur(2px)" : "blur(0px)",
      }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="kicker kicker-pitch">Support triangle</div>
      <h2 className="t-display-sm mt-5 max-w-[16ch] text-balance text-[var(--on-chalk-1)]">
        Athlete effort. Coach clarity. Parent trust.
      </h2>
      <p className="t-lede mt-6 max-w-md text-pretty text-[var(--on-chalk-3)]">
        Three people shape every youth soccer season. Smartplay gives each one
        a different view of the same week — so the athlete stays in charge of
        their own development.
      </p>
      <div className="mt-8 flex items-center gap-3 text-[0.82rem] text-[var(--on-chalk-3)]">
        <span className="size-1.5 rounded-full bg-[var(--lime-deep)]" />
        <span>Hover a lens to open it.</span>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Lens card
   ────────────────────────────────────────────────────────────── */
function LensCard({
  role,
  scrollYProgress,
  entryRange,
  hoverReady,
  expanded,
  onHover,
}: {
  role: (typeof ROLES)[number];
  scrollYProgress: MotionValue<number>;
  entryRange: [number, number];
  hoverReady: boolean;
  expanded: Role | null;
  onHover: (hovering: boolean) => void;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = role.icon;

  // Entrance: x slides from 110px → 0, opacity 0 → 1, scale 0.96 → 1
  const x = useTransform(
    scrollYProgress,
    entryRange,
    reduceMotion ? [0, 0] : [110, 0],
  );
  const opacity = useTransform(scrollYProgress, entryRange, [0, 1]);
  const scale = useTransform(
    scrollYProgress,
    entryRange,
    reduceMotion ? [1, 1] : [0.96, 1],
  );

  const active = expanded === role.id;
  const dim = expanded !== null && !active;

  return (
    <motion.article
      style={{ x, opacity, scale }}
      className="lens-card"
      data-active={active ? "true" : "false"}
      data-dim={dim ? "true" : "false"}
      onMouseEnter={() => hoverReady && onHover(true)}
      onMouseLeave={() => hoverReady && onHover(false)}
      onFocus={() => hoverReady && onHover(true)}
      onBlur={() => hoverReady && onHover(false)}
    >
      <div className="lens-face">
        <div className="flex items-center justify-between">
          <div className="grid size-10 place-items-center rounded-[10px] bg-[var(--pitch)] text-[var(--lime)]">
            <Icon className="size-5" strokeWidth={2} />
          </div>
          <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
            {role.label.toLowerCase()}
          </span>
        </div>

        <div className="mt-8 flex flex-col">
          <span className="t-h3 text-[var(--on-chalk-1)]">{role.label}</span>
          <span className="mt-2 text-[0.95rem] font-semibold text-[var(--on-chalk-2)]">
            {role.line}
          </span>
          <p className="mt-3 text-[0.9rem] leading-7 text-[var(--on-chalk-3)]">
            {role.detail}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-6 text-[0.82rem] font-bold text-[var(--on-chalk-1)]">
          <span className="lens-pip" />
          {role.hoverLabel}
        </div>
      </div>

      {/* Widget panel — absolutely positioned on desktop, stacked on mobile */}
      <div className="lens-widget">
        {role.id === "athlete" && <AthleteLensWidget />}
        {role.id === "coach" && <CoachLensWidget />}
        {role.id === "parent" && <ParentLensWidget />}
      </div>
    </motion.article>
  );
}
