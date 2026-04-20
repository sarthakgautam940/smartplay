"use client";

import { motion, useReducedMotion } from "framer-motion";

type IntakeRow = { label: string; hint: string };

const rows: IntakeRow[] = [
  { label: "Who you support", hint: "team · school · club · nonprofit · program" },
  { label: "Primary goal", hint: "what a useful first week would prove" },
  { label: "Approximate athlete count", hint: "ballpark is fine" },
  { label: "Launch timeline", hint: "week · month · season · whenever" },
];

/**
 * Contact intake card — entry only, no scroll parallax.
 *
 * Rationale: when this card was mounted inside the Contact hero, the
 * previous scroll-linked y/rotate transforms fired on the first scroll
 * because the card's scroll range started before it was ever fully in
 * view. The initial motion value jumped on the first frame of scroll,
 * which the user perceived as a "chop". Removing the parallax — and
 * keeping only a compact whileInView entry — makes the first scroll
 * feel identical to every subsequent scroll.
 */
export function ContactIntakeCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-surface="dark"
      className="card-pitch relative overflow-hidden p-6 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="tactical-field absolute inset-0 opacity-60"
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="mono-xs uppercase text-white/45">
            Pilot intake · 4 fields
          </div>
          <span className="signal-dot flicker" />
        </div>
        <div className="mt-6 space-y-3">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={reduceMotion ? false : { opacity: 0, x: 10 }}
              whileInView={
                reduceMotion ? undefined : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-[var(--lime)]/24 hover:bg-white/[0.04]"
            >
              <div>
                <div className="text-[0.95rem] font-semibold text-white">
                  {row.label}
                </div>
                <div className="mt-1 text-[0.78rem] text-white/42">
                  {row.hint}
                </div>
              </div>
              <span className="grid size-7 place-items-center rounded-full bg-[var(--lime)] text-[0.78rem] font-extrabold text-[var(--pitch)]">
                {i + 1}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="hair-divider mt-6" />
        <div className="mt-4 flex items-center justify-between text-[0.78rem] text-white/44">
          <span className="flex items-center gap-2">
            <span className="signal-dot" style={{ width: 5, height: 5 }} />
            <span className="mono-xs uppercase">live</span>
          </span>
          <span className="mono-xs uppercase">ready for pilot review</span>
        </div>
      </div>
    </motion.div>
  );
}
