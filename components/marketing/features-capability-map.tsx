"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import {
  Brain,
  CalendarDays,
  Dumbbell,
  HeartPulse,
  LineChart,
  Salad,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";

type Capability = {
  n: string;
  title: string;
  surface: string;
  copy: string;
  highlight: string; // the one-line specific
  icon: LucideIcon;
};

const CAPABILITIES: Capability[] = [
  {
    n: "01",
    title: "Training log",
    surface: "Sessions",
    copy: "Type, duration, RPE, intensity, sprint count, touches, shots, tags, notes — turning effort into a pattern instead of memory.",
    highlight: "RPE + sprint count replace memory.",
    icon: Dumbbell,
  },
  {
    n: "02",
    title: "Analytics",
    surface: "Trends",
    copy: "Training load, readiness, recovery, technical radar, match workload, nutrition adherence — read at a glance, exportable as a report.",
    highlight: "Weekly load, readiness, radar.",
    icon: LineChart,
  },
  {
    n: "03",
    title: "Goals",
    surface: "Direction",
    copy: "Performance, fitness, nutrition, wellness, academic balance, and recruiting targets — with progress nudges, not lecture mode.",
    highlight: "Recruiting targets, no lecture.",
    icon: Target,
  },
  {
    n: "04",
    title: "Wellness",
    surface: "Recovery",
    copy: "Sleep, soreness, fatigue, stress, energy, mood, hydration, pain flag, readiness score — recovery suggestions that respect medical limits.",
    highlight: "Sleep, soreness, pain flag.",
    icon: HeartPulse,
  },
  {
    n: "05",
    title: "Nutrition",
    surface: "Fueling",
    copy: "Meals, macros, hydration, simple fueling guidance, and budget-friendly options written for student-athlete reality.",
    highlight: "Budget-friendly fueling.",
    icon: Salad,
  },
  {
    n: "06",
    title: "Video review",
    surface: "Film",
    copy: "Clip upload, frame sampling, structured soccer analysis, confidence labels, timestamped moments, and threaded coach comments.",
    highlight: "Confidence-labeled cues.",
    icon: Video,
  },
  {
    n: "07",
    title: "Mindset",
    surface: "Mental",
    copy: "Confidence, focus, anxiety, motivation, pregame cues, journal prompts, and reflection habits — without diagnostics.",
    highlight: "Pregame cues, no diagnostics.",
    icon: Brain,
  },
  {
    n: "08",
    title: "Calendar",
    surface: "Schedule",
    copy: "Sessions, reminders, match days, team events, parent support moments, and completion context across the season.",
    highlight: "Match days + support moments.",
    icon: CalendarDays,
  },
];

export function FeaturesCapabilityMap() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      CAPABILITIES.length - 1,
      Math.max(0, Math.floor(v * CAPABILITIES.length)),
    );
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      ref={ref}
      data-surface="light"
      className="surface-chalk section-pad"
    >
      <div className="section-shell">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="kicker kicker-pitch">Capabilities</div>
            <h2 className="t-display-sm mt-5 text-balance text-[var(--on-chalk-1)]">
              Each surface is built for a soccer job.
            </h2>
          </div>
          <p className="t-lede max-w-md text-pretty text-[var(--on-chalk-3)]">
            No generic wellness tiles. Every capability maps back to a
            repeatable athlete, coach, parent, or program workflow.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/10 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <CapabilityTile
              key={c.title}
              c={c}
              i={i}
              isActive={i === active}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityTile({
  c,
  i,
  isActive,
  reduceMotion,
}: {
  c: Capability;
  i: number;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  const Icon = c.icon;
  const row = Math.floor(i / 4);
  const col = i % 4;
  const delay = reduceMotion ? 0 : (row + col) * 0.05;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      data-active={isActive ? "true" : "false"}
      className="group relative h-full bg-[var(--chalk)] p-7 transition-[background,color] duration-500 hover:bg-white data-[active=true]:bg-white"
      style={{
        borderRight:
          (i + 1) % 4 !== 0 ? "1px solid rgba(6,16,11,0.08)" : "0",
        borderBottom:
          i < CAPABILITIES.length - 4
            ? "1px solid rgba(6,16,11,0.08)"
            : "0",
      }}
    >
      {/* Active rail — grows on scroll-activation or hover */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-7 bottom-7 w-[2px] origin-bottom scale-y-0 bg-[var(--lime)] transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-data-[active=true]:scale-y-100"
      />

      <div className="flex items-center justify-between">
        <div className="grid size-10 place-items-center rounded-[10px] bg-[var(--pitch)] text-[var(--lime)] transition group-hover:scale-[1.06] group-data-[active=true]:scale-[1.06]">
          <Icon className="size-5" strokeWidth={2} />
        </div>
        <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
          {c.n}
        </span>
      </div>

      <div className="t-h3 mt-7 text-[1.3rem] text-[var(--on-chalk-1)]">
        {c.title}
      </div>
      <div className="mono-xs mt-1 uppercase text-[var(--on-chalk-4)]">
        {c.surface}
      </div>

      {/* Highlight line — appears when tile is the scroll-active one or
          on hover; otherwise the long copy shows. Gives density without
          crowding: active state reads like a tactical sentence. */}
      <p className="mt-4 text-[0.88rem] leading-7 text-[var(--on-chalk-3)] transition-opacity duration-300 group-hover:opacity-0 group-data-[active=true]:opacity-0">
        {c.copy}
      </p>
      <p
        aria-hidden="true"
        className="mono-xs pointer-events-none absolute inset-x-7 bottom-7 text-[0.78rem] uppercase text-[var(--lime-deep)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[active=true]:opacity-100"
      >
        {c.highlight}
      </p>
    </motion.div>
  );
}
