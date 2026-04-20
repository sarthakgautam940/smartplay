"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { ScrollFillNumber } from "@/components/marketing/scroll-fill-number";
import { TransitionLink } from "@/components/marketing/transition-link";

/**
 * Features hero — editorial typography, single column, with an
 * 8-surface index rail along the bottom that fills sequentially
 * as the page scrolls out. Restraint over density.
 */

const SURFACES = [
  { n: "01", title: "Sessions" },
  { n: "02", title: "Analytics" },
  { n: "03", title: "Goals" },
  { n: "04", title: "Wellness" },
  { n: "05", title: "Nutrition" },
  { n: "06", title: "Film" },
  { n: "07", title: "Mindset" },
  { n: "08", title: "Calendar" },
];

export function FeaturesHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -48],
  );
  const indexY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 24],
  );
  const fade = useTransform(scrollYProgress, [0, 0.82], [1, 0]);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="hero-pitch relative overflow-hidden"
    >
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="section-shell relative z-10 flex min-h-[calc(100svh-72px)] flex-col justify-between section-pad"
      >
        <div className="max-w-[1100px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="kicker kicker-lime"
          >
            Features
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="t-display mt-6 text-balance text-white"
          >
            Eight surfaces.{" "}
            <span className="text-[var(--lime)]">One serious week.</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="t-lede mt-9 max-w-[54ch] text-pretty text-white/62"
          >
            Smartplay isn&apos;t a wellness app, a training log, or a film
            tool. It&apos;s the system that connects all of them — so the
            athlete sees one week instead of eight tabs.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <TransitionLink href="/signup" className="btn-primary focus-ring">
              Build your profile
              <ArrowUpRight className="size-4" strokeWidth={2.6} />
            </TransitionLink>
            <TransitionLink href="/pricing" className="btn-ghost-dark focus-ring">
              See the $12 plan
            </TransitionLink>
          </motion.div>
        </div>

        <motion.div style={{ y: indexY }} className="mt-20">
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <span className="mono-xs uppercase text-white/38">
              The full surface map
            </span>
            <span className="mono-xs uppercase text-[var(--lime)]/70">
              08 / 08
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
            {SURFACES.map((s, i) => (
              <motion.div
                key={s.n}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.52 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col gap-1.5 text-white/55 transition-colors hover:text-white"
              >
                <ScrollFillNumber
                  size="2.2rem"
                  weight={500}
                  letterSpacing="-0.04em"
                  outlineColor="rgba(181, 255, 93, 0.35)"
                >
                  {s.n}
                </ScrollFillNumber>
                <span className="text-[0.86rem] font-semibold leading-tight">
                  {s.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
