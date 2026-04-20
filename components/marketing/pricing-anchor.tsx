"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

import { TransitionLink } from "@/components/marketing/transition-link";

/**
 * Pricing anchor — the $12 Player plan is the page's center of mass.
 * Single large price, flanked by concise supporting copy, with the
 * trial mechanics surfaced on a dark card that lifts on scroll.
 *
 * Team + Community are not plan cards here — they're editorial
 * paragraphs lower on the page. This matches the brand voice: one
 * live plan, two real conversations.
 */

const INCLUDED = [
  "Athlete dashboard + weekly analytics",
  "Session, wellness, nutrition, mindset logs",
  "Video review with confidence-labeled AI",
  "Public recruiting profile the athlete controls",
  "Calendar, goals, and reflection habits",
  "Family-friendly to explain",
];

const MECHANICS = [
  { label: "Trial", value: "14 days" },
  { label: "Card up front", value: "No" },
  { label: "Cancel", value: "Anytime" },
  { label: "After trial", value: "$12 / mo" },
];

export function PricingAnchor() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -40],
  );
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -12],
  );
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <section
      ref={ref}
      data-surface="light"
      className="surface-chalk-2 relative overflow-hidden"
    >
      <div className="section-shell relative z-10 section-pad">
        <motion.div style={{ y: headY, opacity: fade }} className="mx-auto max-w-[1100px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="kicker kicker-pitch"
          >
            Pricing
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="t-display mt-6 max-w-[18ch] text-balance text-[var(--on-chalk-1)]"
          >
            One live plan.{" "}
            <span className="text-[var(--on-chalk-4)]">Two real conversations.</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="t-lede mt-8 max-w-[58ch] text-pretty text-[var(--on-chalk-3)]"
          >
            Start the athlete trial with a click. Bringing a team or a program?
            We shape pricing to the week the program actually runs. Smartplay
            scales when it earns the right to.
          </motion.p>
        </motion.div>

        {/* Anchor card — the $12 plan, center stage */}
        <motion.div
          style={{ y: cardY }}
          className="mx-auto mt-16 max-w-[980px]"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            data-surface="dark"
            className="relative overflow-hidden rounded-3xl p-8 text-white sm:p-12"
            style={{
              background:
                "linear-gradient(180deg, #0c1a15 0%, #081410 60%, #0b1712 100%)",
              boxShadow:
                "0 50px 120px -50px rgba(6,16,11,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div
              aria-hidden="true"
              className="grid-pitch absolute inset-0 opacity-[0.3]"
              style={{
                maskImage:
                  "radial-gradient(72% 52% at 82% 10%, black 0%, transparent 68%)",
              }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex items-center justify-between">
                  <span className="kicker kicker-lime">Player · Live</span>
                  <span className="flex items-center gap-2 mono-xs uppercase text-white/50">
                    <span className="signal-dot" />
                    checkout open
                  </span>
                </div>

                <div className="mt-8 flex items-baseline gap-3">
                  <span className="t-display text-[5.5rem] leading-none text-white">
                    $12
                  </span>
                  <span className="pb-3 text-[1.05rem] text-white/62">
                    / month
                  </span>
                </div>

                <p className="mt-6 max-w-md text-[1rem] leading-8 text-white/65">
                  For the individual athlete who wants one connected place for
                  training, recovery, nutrition, mindset, film, goals,
                  calendar, and a recruiting profile they actually own.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <TransitionLink
                    href="/signup"
                    className="btn-primary focus-ring"
                  >
                    Start 14-day trial
                    <ArrowUpRight className="size-4" strokeWidth={2.6} />
                  </TransitionLink>
                  <TransitionLink
                    href="/billing/start"
                    className="btn-ghost-dark focus-ring"
                  >
                    Go straight to checkout
                  </TransitionLink>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 text-[0.82rem] sm:grid-cols-4">
                  {MECHANICS.map((m) => (
                    <div key={m.label}>
                      <div className="mono-xs uppercase text-white/42">
                        {m.label}
                      </div>
                      <div className="mt-1 font-semibold text-white">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
                <div className="mono-xs uppercase text-[var(--lime)]/85">
                  Included
                </div>
                <ul className="mt-4 grid gap-3 text-[0.9rem] leading-6 text-white/75">
                  {INCLUDED.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--lime)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
