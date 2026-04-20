"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, CheckCircle2, Circle } from "lucide-react";

/**
 * Coach lens widget — a mini team-readiness roster. One athlete flagged
 * amber, one awaiting a clip review, the rest healthy. Honest signals,
 * not surveillance aesthetics.
 */

type RosterRow = {
  initials: string;
  name: string;
  position: string;
  readiness: number; // 0–100
  status: "clear" | "flag" | "review";
  note: string;
};

const ROSTER: RosterRow[] = [
  {
    initials: "MK",
    name: "M. Khan",
    position: "CDM",
    readiness: 84,
    status: "clear",
    note: "Full session · RPE 6 last night",
  },
  {
    initials: "SR",
    name: "S. Rivera",
    position: "LW",
    readiness: 48,
    status: "flag",
    note: "Sleep 5h · soreness ↑",
  },
  {
    initials: "JN",
    name: "J. Nguyen",
    position: "CB",
    readiness: 79,
    status: "clear",
    note: "On plan",
  },
  {
    initials: "AB",
    name: "A. Baptiste",
    position: "ST",
    readiness: 71,
    status: "review",
    note: "Clip submitted · 1:04",
  },
];

export function CoachLensWidget() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col gap-4 bg-gradient-to-b from-[#f8faf3] to-[#eef3e5] p-6 text-[var(--on-chalk-1)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="mono-xs uppercase text-[var(--on-chalk-4)]">
            Roster · Tue morning
          </div>
          <div className="t-h3 mt-1 text-[var(--on-chalk-1)]">U17 readiness</div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--on-chalk-1)]/10 bg-white px-3 py-1 text-[0.76rem] text-[var(--on-chalk-2)]">
          <span className="size-1.5 rounded-full bg-[var(--amber)]" />
          1 flagged
        </div>
      </div>

      <div className="flex flex-col divide-y divide-[var(--on-chalk-1)]/8 rounded-xl border border-[var(--on-chalk-1)]/10 bg-white/80">
        {ROSTER.map((row, i) => (
          <motion.div
            key={row.initials}
            initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.32, delay: 0.08 * i }}
            className="flex items-center gap-3 p-3"
          >
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-[8px] text-[0.72rem] font-bold ${
                row.status === "flag"
                  ? "bg-[var(--amber)]/20 text-[#8a5a10]"
                  : row.status === "review"
                    ? "bg-[var(--ice)]/30 text-[#20566c]"
                    : "bg-[var(--pitch)] text-[var(--on-pitch-1)]"
              }`}
            >
              {row.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[0.86rem] font-semibold text-[var(--on-chalk-1)]">
                  {row.name}
                </span>
                <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
                  {row.position}
                </span>
              </div>
              <div className="mt-0.5 text-[0.76rem] text-[var(--on-chalk-3)]">
                {row.note}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-[22px] w-14 items-center gap-[2px]">
                <ReadinessBars value={row.readiness} />
              </div>
              {row.status === "flag" ? (
                <AlertTriangle className="size-4 text-[#c58612]" />
              ) : row.status === "review" ? (
                <Circle className="size-4 text-[#2b7691]" />
              ) : (
                <CheckCircle2 className="size-4 text-[var(--lime-deep)]" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 rounded-xl border border-[var(--on-chalk-1)]/8 bg-white/60 p-3">
        <div>
          <div className="mono-xs uppercase text-[var(--on-chalk-4)]">
            Next decision
          </div>
          <p className="mt-1 text-[0.86rem] text-[var(--on-chalk-2)]">
            Rivera on modified load Wed · keep Baptiste clip in review queue.
          </p>
        </div>
        <ArrowUpRight className="size-4 text-[var(--on-chalk-2)]" strokeWidth={2.4} />
      </div>
    </div>
  );
}

function ReadinessBars({ value }: { value: number }) {
  // Four bars, filled by readiness. 100% = 4 bars; 25% = 1 bar.
  const active = Math.ceil(value / 25);
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => {
        const on = i < active;
        return (
          <span
            key={i}
            className="h-full flex-1 rounded-sm"
            style={{
              background: on
                ? value < 50
                  ? "var(--amber)"
                  : "var(--lime-deep)"
                : "rgba(6,16,11,0.12)",
            }}
          />
        );
      })}
    </>
  );
}
