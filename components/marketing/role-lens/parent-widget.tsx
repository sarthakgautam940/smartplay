"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, EyeOff, Heart } from "lucide-react";

/**
 * Parent lens widget — the calm, bounded view. One line of update, a
 * 7-day recovery strip, next on the calendar, and an explicit list of
 * what the parent does NOT see (boundary-first language).
 */

const RECOVERY_7DAYS = [
  { day: "S", value: 68 },
  { day: "M", value: 74 },
  { day: "T", value: 82 },
  { day: "W", value: 71 },
  { day: "T", value: 66 },
  { day: "F", value: 78 },
  { day: "S", value: 72 }, // today
];

export function ParentLensWidget() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col gap-5 bg-gradient-to-br from-[#f4f6ef] via-[#eef3e5] to-[#e6ecd9] p-6 text-[var(--on-chalk-1)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mono-xs uppercase text-[var(--on-chalk-4)]">
            Today · Tuesday
          </div>
          <div className="t-h3 mt-1 text-balance text-[var(--on-chalk-1)]">
            Maya logged her session. Slept 7h 20m. Wants to talk about Saturday.
          </div>
        </div>
        <div className="hidden rounded-full border border-[var(--on-chalk-1)]/10 bg-white px-3 py-1 mono-xs uppercase text-[var(--on-chalk-3)] sm:inline-flex">
          calm feed
        </div>
      </div>

      {/* 7-day recovery strip */}
      <div className="rounded-xl border border-[var(--on-chalk-1)]/8 bg-white/70 p-4">
        <div className="flex items-baseline justify-between">
          <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
            Recovery · last 7 days
          </span>
          <span className="flex items-center gap-1.5 mono-xs text-[var(--lime-deep)]">
            <Heart className="size-3" fill="currentColor" strokeWidth={0} />
            steady
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-1">
          {RECOVERY_7DAYS.map((d, i) => {
            const today = i === RECOVERY_7DAYS.length - 1;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <motion.div
                  initial={reduceMotion ? undefined : { height: 0 }}
                  animate={reduceMotion ? undefined : { height: `${d.value * 0.52}px` }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full rounded-md"
                  style={{
                    background: today ? "var(--lime-deep)" : "rgba(6,16,11,0.22)",
                    minHeight: 6,
                  }}
                />
                <span
                  className={`mono-xs ${today ? "font-bold text-[var(--on-chalk-1)]" : "text-[var(--on-chalk-4)]"}`}
                >
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next on the calendar */}
      <div className="rounded-xl border border-[var(--on-chalk-1)]/8 bg-white/70 p-4">
        <div className="flex items-center gap-2 mono-xs uppercase text-[var(--on-chalk-4)]">
          <CalendarDays className="size-3.5" strokeWidth={2.2} />
          Next on the calendar
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <div>
            <div className="text-[0.9rem] font-semibold text-[var(--on-chalk-1)]">
              Match · at Lincoln HS
            </div>
            <div className="mt-1 text-[0.8rem] text-[var(--on-chalk-3)]">
              Saturday · 11:00 · 24-minute drive
            </div>
          </div>
          <span className="rounded-md border border-[var(--lime-deep)]/30 bg-[var(--lime-deep)]/10 px-2 py-1 mono-xs uppercase text-[var(--lime-deep)]">
            confirmed
          </span>
        </div>
      </div>

      {/* The boundary block — what parent DOES NOT see. This is the
          parent-persona's conversion moment. */}
      <div className="mt-auto rounded-xl border border-[var(--on-chalk-1)]/8 bg-[var(--pitch)]/95 p-4 text-[var(--on-pitch-1)]">
        <div className="flex items-center gap-2 mono-xs uppercase text-[var(--lime)]">
          <EyeOff className="size-3.5" strokeWidth={2.2} />
          You don&apos;t see
        </div>
        <ul className="mt-2 grid gap-1 text-[0.82rem] text-white/72">
          <li>— private mindset notes</li>
          <li>— raw session ratings</li>
          <li>— coach↔athlete threads</li>
        </ul>
        <p className="mt-3 text-[0.78rem] text-white/52">
          The athlete&apos;s data stays with the athlete. You see what helps
          you support them.
        </p>
      </div>
    </div>
  );
}
