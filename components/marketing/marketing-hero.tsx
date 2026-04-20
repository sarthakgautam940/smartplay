"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef } from "react";

import { ScrollFillNumber } from "@/components/marketing/scroll-fill-number";
import { TransitionLink } from "@/components/marketing/transition-link";

/**
 * Hero — clean editorial.
 *
 * Removed in this pass: oversized SMARTPLAY watermark, slow light sweep,
 * grain filter, focal arc + target + traveling pulse, tactical chips.
 * The left-side "pro setup" composition is retired — fresh headline copy
 * and layout instead.
 *
 * Surface is just `hero-pitch` (the existing pitch gradient + faint grid
 * already in globals.css) — no extra layers.
 *
 * Right side is intentionally minimal: a chapter marker, a hairline,
 * and one line of caption. The eye lands on the headline, then on the
 * outline numeral that fills as the page begins to move.
 *
 * Curtain-split exit on scroll is preserved.
 */
export function MarketingHero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const leftX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -140],
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 160],
  );
  const leftOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section
      ref={sectionRef}
      data-surface="dark"
      className="hero-pitch relative"
    >
      <div className="section-shell relative z-10 grid min-h-[calc(100svh-72px)] grid-cols-12 items-center gap-x-10 py-16 lg:py-20">
        {/* LEFT — headline */}
        <motion.div
          style={{ x: leftX, opacity: leftOpacity }}
          className="col-span-12 max-w-[720px] lg:col-span-8"
        >
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="headline-mega text-[clamp(3.2rem,7.4vw,6.8rem)] text-white"
          >
            <span className="block">Built for the athletes</span>
            <span className="block">
              doing the{" "}
              <span className="text-[var(--lime)]">real work</span>.
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-white/62 sm:text-[1.14rem]"
          >
            Smartplay connects training, recovery, film, and mindset into one
            honest system — so the week that matters most is the week
            that&apos;s actually connected.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <TransitionLink href="/signup" className="btn-primary focus-ring">
              Start the 14-day trial
              <ArrowUpRight className="size-4" strokeWidth={2.6} />
            </TransitionLink>
            <TransitionLink href="/features" className="btn-ghost-dark focus-ring">
              <Play className="size-3.5 fill-current" strokeWidth={0} />
              See the week connect
            </TransitionLink>
            <span className="ml-0 flex items-center gap-2 text-[0.78rem] text-white/40 sm:ml-2">
              <span className="size-1 rounded-full bg-white/35" />
              No card · $12/mo after
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT — chapter marker, intentionally quiet */}
        <motion.div
          style={{ x: rightX, opacity: rightOpacity }}
          className="hidden lg:col-span-4 lg:block"
        >
          <div className="flex flex-col items-end">
            <ScrollFillNumber
              size="clamp(7rem, 14vw, 12rem)"
              letterSpacing="-0.06em"
              outlineColor="rgba(247, 248, 239, 0.18)"
              fillColor="var(--lime)"
              fillStart={0}
              fillEnd={0.6}
            >
              01
            </ScrollFillNumber>
          </div>

          <div className="mt-6 flex justify-end">
            <span className="block h-px w-24 bg-[var(--lime)]/45" />
          </div>

          <div className="mt-5 flex justify-end">
            <div
              className="max-w-[220px] text-right uppercase text-white/52"
              style={{
                fontFamily: "ui-monospace, 'JetBrains Mono', Menlo, monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                lineHeight: 1.7,
              }}
            >
              chapter 01 of 05 — an honest system for serious soccer weeks
            </div>
          </div>
        </motion.div>
      </div>

      {/* Proof rail */}
      <ProofRail scrollYProgress={scrollYProgress} />
    </section>
  );
}

const proofTiles = [
  { label: "Athlete trial", value: "14 days", sub: "no card upfront" },
  { label: "Player plan", value: "$12/mo", sub: "cancel anytime" },
  { label: "Role views", value: "3", sub: "athlete · coach · parent" },
  { label: "AI stance", value: "Bounded", sub: "labeled, not hidden" },
];

function ProofRail({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  return (
    <motion.div style={{ y }} className="relative z-10 border-t border-white/6">
      <div className="section-shell grid grid-cols-2 divide-x divide-white/6 lg:grid-cols-4">
        {proofTiles.map((p, i) => (
          <div
            key={p.label}
            className={`px-5 py-6 transition hover:bg-white/[0.02] ${
              i >= 2 ? "border-t border-white/6 lg:border-t-0" : ""
            }`}
          >
            <div
              className="uppercase text-white/42"
              style={{
                fontFamily:
                  "ui-monospace, 'JetBrains Mono', Menlo, monospace",
                fontSize: "0.64rem",
                letterSpacing: "0.18em",
              }}
            >
              {p.label}
            </div>
            <div className="headline mt-2 text-[1.45rem] text-white sm:text-[1.65rem]">
              {p.value}
            </div>
            <div className="mt-1 text-[0.76rem] text-white/42">{p.sub}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
