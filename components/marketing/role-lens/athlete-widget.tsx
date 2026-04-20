"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Flame, Footprints, Target } from "lucide-react";

/**
 * Athlete lens widget — Tuesday session as an athlete sees it.
 * Live-ish metrics with subtle micro-animation. Soccer-specific tags.
 */
export function AthleteLensWidget() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col gap-4 bg-gradient-to-b from-[#0a1814] to-[#06100b] p-6 text-[var(--on-pitch-1)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="mono-xs uppercase text-white/45">Tue · 06:12 pm</div>
          <div className="t-h3 mt-1 text-white">Tempo session</div>
        </div>
        <div className="rounded-full border border-[var(--lime)]/30 bg-[var(--lime)]/10 px-3 py-1 mono-xs uppercase text-[var(--lime)]">
          logged
        </div>
      </div>

      {/* Core session row */}
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/8 bg-white/[0.03] p-3">
        <MetricCell icon={Footprints} label="Sprint" value="11" suffix="reps" />
        <MetricCell icon={Flame} label="RPE" value="6" suffix="/ 10" tone="lime" />
        <MetricCell icon={Target} label="Touches" value="428" />
      </div>

      {/* Weak-foot tags — SmartPlay is specific about soccer vocabulary */}
      <div>
        <div className="mono-xs uppercase text-white/45">Tagged</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["weak-foot", "1v1 wide", "late fatigue", "left-half"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 * i }}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[0.72rem] text-white/75"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Progress / readiness */}
      <div>
        <div className="flex items-baseline justify-between">
          <span className="mono-xs uppercase text-white/45">Week load</span>
          <span className="mono-xs font-bold text-white">62%</span>
        </div>
        <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={reduceMotion ? undefined : { width: "0%" }}
            animate={reduceMotion ? undefined : { width: "62%" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-[var(--lime)]"
          />
        </div>
      </div>

      {/* Coach note — the calm specific kind */}
      <div className="mt-auto rounded-xl border border-white/8 bg-white/[0.03] p-3 text-[0.86rem] leading-6 text-white/78">
        <div className="mono-xs uppercase text-[var(--lime)]">Coach · Devon</div>
        <p className="mt-1">
          Plant-foot angle cleaner after minute 40. Keep it tomorrow, 12 weak-foot
          reps before finishing.
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-[0.82rem] font-bold text-[var(--lime)]">
        Open session
        <ArrowUpRight className="size-3.5" strokeWidth={2.6} />
      </div>
    </div>
  );
}

function MetricCell({
  icon: Icon,
  label,
  value,
  suffix,
  tone,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  suffix?: string;
  tone?: "lime";
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 mono-xs uppercase text-white/50">
        <Icon className="size-3" strokeWidth={2} />
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`t-h3 text-[1.5rem] ${tone === "lime" ? "text-[var(--lime)]" : "text-white"}`}
        >
          {value}
        </span>
        {suffix && <span className="mono-xs text-white/50">{suffix}</span>}
      </div>
    </div>
  );
}
