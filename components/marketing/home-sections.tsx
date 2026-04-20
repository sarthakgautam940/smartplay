"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  HeartPulse,
  Salad,
  ShieldCheck,
  Target,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/marketing/motion-primitives";
import { ScrollFillNumber } from "@/components/marketing/scroll-fill-number";
import { TransitionLink } from "@/components/marketing/transition-link";

/* ──────────────────────────────────────────────────────────────
   Section data
   ────────────────────────────────────────────────────────────── */

const rolePaths = [
  {
    role: "Athlete",
    icon: Target,
    line: "Know the next useful rep.",
    detail:
      "Sessions, recovery, nutrition, mindset, goals, and film stay tied to the week the athlete is actually living.",
    cue: "Start the trial",
  },
  {
    role: "Coach",
    icon: Users,
    line: "Scan the roster without noise.",
    detail:
      "Readiness, submitted clips, session trends, and drill assignments become quick coaching decisions.",
    cue: "Pilot team workflows",
  },
  {
    role: "Parent",
    icon: ShieldCheck,
    line: "Support without taking over.",
    detail:
      "High-level visibility on schedule, recovery, and goals — without parents becoming a second coach.",
    cue: "Trust the big picture",
  },
];

const weekLoop = [
  {
    n: "01",
    title: "Log",
    copy: "Session type, duration, RPE, technical focus, and notes turn effort into a pattern instead of memory.",
    icon: Dumbbell,
    threshold: 0.05,
  },
  {
    n: "02",
    title: "Read",
    copy: "Wellness, nutrition, load, and mindset signals show what the athlete can actually handle next.",
    icon: HeartPulse,
    threshold: 0.32,
  },
  {
    n: "03",
    title: "Review",
    copy: "Clips become timestamped cues, drill ideas, and coach comments — without pretending to be event tracking.",
    icon: Video,
    threshold: 0.58,
  },
  {
    n: "04",
    title: "Adjust",
    copy: "The week closes with one practical next action: recover, repeat, sharpen, schedule, or ask for review.",
    icon: Brain,
    threshold: 0.82,
  },
];

const signalGrid = [
  { n: "01", label: "Training load", role: "Action", icon: Dumbbell },
  { n: "02", label: "Recovery signal", role: "Analysis", icon: HeartPulse },
  { n: "03", label: "Nutrition rhythm", role: "Fueling", icon: Salad },
  { n: "04", label: "Mindset check", role: "Mental", icon: Brain },
  { n: "05", label: "Calendar pressure", role: "Schedule", icon: CalendarDays },
  { n: "06", label: "Film review", role: "Cue", icon: Video },
];

const aiCues = [
  "Plant foot set earlier before the finish.",
  "Protect technique once fatigue appears late.",
  "Repeat the cleaner approach angle tomorrow.",
];

/* ──────────────────────────────────────────────────────────────
   Page assembly
   ────────────────────────────────────────────────────────────── */

export function HomeSections() {
  return (
    <>
      <RolesSection />
      <WeekLoopSection />
      <AIProofSection />
      <ConnectedSignalsSection />
      <FinalCTASection />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   Roles — chalk surface. Entry is a single linear scroll motion.
   Seam with the pitch hero above is deliberate, not a blur hack.
   ────────────────────────────────────────────────────────────── */

function RolesSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Two scroll observers, two independent jobs:
  //   • `scrollYProgress` — entry of the section, drives card lift.
  //   • `parallaxProgress` — the section's whole journey through the viewport,
  //      drives a strong upward parallax on the section itself, so the chalk
  //      surface rises faster than the natural scroll and fully covers the
  //      dark proof rail above. No blurred seam, no muddy overlap — just the
  //      chalk pulling up over the dark behind it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 40%"],
  });
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardsY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [40, 0],
  );

  // Section rises 160px over its full passage — overscroll-style cover.
  const sectionY = useTransform(
    parallaxProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -160],
  );

  return (
    <motion.section
      ref={sectionRef}
      data-surface="light"
      style={{ y: sectionY, willChange: "transform" }}
      className="surface-chalk relative py-24 sm:py-32"
    >
      {/* Intentional chapter seam — oversized "02" straddles the boundary
          with the pitch hero above, and fills from outline → lime as the
          section scrolls into view. No blur, no muddy band. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center overflow-hidden"
        style={{ height: 0 }}
      >
        <div style={{ transform: "translateY(-70%)" }}>
          <ScrollFillNumber
            size="clamp(6rem, 14vw, 12rem)"
            letterSpacing="-0.05em"
            outlineColor="rgba(181, 255, 93, 0.4)"
          >
            02
          </ScrollFillNumber>
        </div>
      </div>

      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="kicker kicker-pitch">Chapter 02 · Support triangle</div>
            <h2 className="headline mt-5 max-w-[16ch] text-[clamp(2.4rem,4.4vw,3.75rem)] text-[var(--on-chalk-1)]">
              Athlete effort. Coach clarity. Parent trust.
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-7 text-[var(--on-chalk-3)]">
              Three people shape every youth soccer season. Smartplay gives
              each one a different view of the same week — so the athlete
              stays in charge of their development.
            </p>
          </div>

          <motion.div
            style={{ y: cardsY }}
            className="grid gap-4 md:grid-cols-3"
          >
            {rolePaths.map((path, index) => (
              <RoleCard key={path.role} path={path} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function RoleCard({
  path,
  index,
}: {
  path: (typeof rolePaths)[number];
  index: number;
}) {
  const Icon = path.icon;
  return (
    <div className="card-chalk group relative flex h-full flex-col p-6 transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(6,16,11,0.25)]">
      <div className="flex items-center justify-between">
        <div className="grid size-10 place-items-center rounded-[10px] bg-[var(--pitch)] text-[var(--lime)]">
          <Icon className="size-5" strokeWidth={2} />
        </div>
        <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
          0{index + 1}
        </span>
      </div>
      <div className="headline mt-8 text-[1.7rem] text-[var(--on-chalk-1)]">
        {path.role}
      </div>
      <div className="mt-2 text-[0.95rem] font-semibold text-[var(--on-chalk-2)]">
        {path.line}
      </div>
      <p className="mt-3 text-[0.9rem] leading-7 text-[var(--on-chalk-3)]">
        {path.detail}
      </p>
      <div className="mt-auto flex items-center gap-1.5 pt-7 text-[0.82rem] font-bold text-[var(--on-chalk-1)] transition-[gap] group-hover:gap-2.5">
        {path.cue}
        <ArrowUpRight
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.6}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Week loop — pitch surface, sequential reveal on rail. Preserved.
   ────────────────────────────────────────────────────────────── */

function WeekLoopSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 40%"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="surface-pitch-gradient relative py-28 sm:py-36"
    >
      <div className="section-shell">
        <div className="grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="kicker kicker-lime">Chapter 03 · The week loop</div>
              <h2 className="headline mt-5 max-w-[15ch] text-[clamp(2.4rem,4.4vw,3.75rem)] text-white">
                Scroll feels like the season clicking into place.
              </h2>
              <p className="mt-6 max-w-md text-[1.02rem] leading-7 text-white/60">
                The product is the rhythm: log the work, read the body, review
                the clip, adjust before the next session. Each beat unlocks as
                you move down the page.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <TransitionLink href="/features" className="btn-primary focus-ring">
                  Explore features
                  <ArrowUpRight className="size-4" strokeWidth={2.6} />
                </TransitionLink>
                <TransitionLink href="/pricing" className="btn-ghost-dark focus-ring">
                  See pricing
                </TransitionLink>
              </div>
            </Reveal>
          </div>

          <div className="relative pl-10 sm:pl-12">
            <div className="absolute left-3 top-1 h-[calc(100%-0.5rem)] w-px bg-white/10" />
            <motion.div
              aria-hidden="true"
              className="absolute left-3 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-[var(--lime)]"
              style={{ scaleY: railScale }}
            />
            <div className="space-y-5">
              {weekLoop.map((item, index) => (
                <WeekLoopItem
                  key={item.title}
                  item={item}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeekLoopItem({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof weekLoop)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;

  const opacity = useTransform(
    scrollYProgress,
    [item.threshold - 0.08, item.threshold + 0.04],
    reduceMotion ? [1, 1] : [0.32, 1],
  );
  const x = useTransform(
    scrollYProgress,
    [item.threshold - 0.08, item.threshold + 0.04],
    reduceMotion ? [0, 0] : [-8, 0],
  );

  const [lit, setLit] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setLit(v >= item.threshold - 0.02);
  });

  return (
    <motion.div style={{ opacity, x }} className="relative">
      <span
        aria-hidden="true"
        className="absolute -left-[2.4rem] top-7 grid size-3.5 place-items-center"
      >
        <span
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            background: lit ? "var(--lime)" : "var(--pitch)",
            border: "1px solid",
            borderColor: lit ? "var(--lime)" : "rgba(255,255,255,0.18)",
            boxShadow: lit
              ? "0 0 0 5px rgba(181,255,93,0.18), 0 0 20px rgba(181,255,93,0.45)"
              : "none",
          }}
        />
      </span>
      <div
        className="rounded-2xl border p-6 transition duration-500"
        style={{
          borderColor: lit ? "rgba(181,255,93,0.18)" : "rgba(255,255,255,0.08)",
          background: lit ? "rgba(181,255,93,0.04)" : "rgba(255,255,255,0.025)",
        }}
      >
        <div className="flex items-start gap-5">
          <div
            className="grid size-11 shrink-0 place-items-center rounded-[10px] transition duration-500"
            style={{
              background: lit ? "var(--lime)" : "rgba(255,255,255,0.06)",
              color: lit ? "var(--pitch)" : "var(--on-pitch-2)",
            }}
          >
            <Icon className="size-5" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-3">
              <span className="mono-xs uppercase text-white/38">{item.n}</span>
              <span className="headline text-[1.85rem] text-white">
                {item.title}
              </span>
            </div>
            <p className="mt-2 max-w-xl text-[0.95rem] leading-7 text-white/62">
              {item.copy}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-2 hidden size-2 shrink-0 rounded-full transition duration-500 sm:block"
            style={{
              background: lit ? "var(--lime)" : "rgba(255,255,255,0.14)",
            }}
          />
        </div>
      </div>
      <span className="sr-only">
        {item.title} — step {index + 1}
      </span>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   AI proof — scroll-linked scrub bars + film card. Preserved.
   ────────────────────────────────────────────────────────────── */

function AIProofSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const bar1 = useTransform(scrollYProgress, [0.0, 0.55], [0, 0.72]);
  const bar2 = useTransform(scrollYProgress, [0.18, 0.75], [0, 0.5]);
  const bar3 = useTransform(scrollYProgress, [0.35, 0.92], [0, 0.85]);

  const t1Sec = useTransform(scrollYProgress, [0.0, 0.55], [0, 14]);
  const t2Sec = useTransform(scrollYProgress, [0.18, 0.75], [0, 42]);
  const t3Sec = useTransform(scrollYProgress, [0.35, 0.92], [0, 68]);

  return (
    <section
      ref={ref}
      data-surface="light"
      className="surface-chalk relative overflow-hidden py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              data-surface="dark"
              className="relative overflow-hidden rounded-2xl bg-[var(--pitch)] p-6 text-white sm:p-8"
              style={{
                boxShadow:
                  "0 40px 100px -50px rgba(6,16,11,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              <div
                aria-hidden="true"
                className="grid-pitch absolute inset-0 opacity-50"
                style={{
                  maskImage:
                    "linear-gradient(180deg, black 0%, transparent 78%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mono-xs uppercase text-white/45">
                      Clip · 1:32 review
                    </div>
                    <div className="headline mt-2 text-[1.65rem] text-white">
                      Three coachable moments
                    </div>
                  </div>
                  <Video className="size-7 text-[var(--lime)]" />
                </div>

                <div className="mt-7 space-y-4">
                  <ScrubBar
                    label="Approach angle"
                    confidence="high"
                    color="var(--lime)"
                    progress={bar1}
                    totalSec={t1Sec}
                  />
                  <ScrubBar
                    label="Late fatigue cue"
                    confidence="medium"
                    color="var(--amber)"
                    progress={bar2}
                    totalSec={t2Sec}
                  />
                  <ScrubBar
                    label="Press trigger window"
                    confidence="labeled lower"
                    color="var(--ice)"
                    progress={bar3}
                    totalSec={t3Sec}
                  />
                </div>

                <div className="hair-divider mt-7" />

                <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-4 text-[0.9rem] leading-6 text-white/70">
                  <div className="mono-xs uppercase text-[var(--lime)]/80">
                    Smartplay says
                  </div>
                  <p className="mt-2">
                    Cleaner first touch protects the final 15 minutes. Repeat
                    the approach angle from 00:14 tomorrow.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="kicker kicker-pitch">Chapter 04 · Honest AI</div>
              <h2 className="headline mt-5 max-w-[18ch] text-[clamp(2.4rem,4.4vw,3.75rem)] text-[var(--on-chalk-1)]">
                AI is useful here because it stays inside the work.
              </h2>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-7 text-[var(--on-chalk-3)]">
                Smartplay samples clips, reads athlete context, and produces
                structured coaching points. When the model has less to work
                with, it labels the uncertainty plainly — instead of pretending
                to know.
              </p>
              <div className="mt-8 grid gap-3">
                {aiCues.map((cue) => (
                  <Reveal key={cue} delay={0.08}>
                    <div className="flex gap-3 rounded-xl border border-[var(--on-chalk-1)]/8 bg-white/70 p-4 text-[0.92rem] leading-6 text-[var(--on-chalk-2)]">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--pitch)]" />
                      <span>{cue}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrubBar({
  label,
  confidence,
  color,
  progress,
  totalSec,
}: {
  label: string;
  confidence: string;
  color: string;
  progress: MotionValue<number>;
  totalSec: MotionValue<number>;
}) {
  const widthPct = useTransform(progress, (v) => `${Math.round(v * 100)}%`);
  const [time, setTime] = useState("00:00");
  useMotionValueEvent(totalSec, "change", (v) => {
    const total = Math.max(0, Math.round(v));
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    setTime(`${m}:${s}`);
  });

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2.5">
          <span className="mono-xs text-white">{time}</span>
          <span className="text-[0.92rem] font-semibold text-white">
            {label}
          </span>
        </div>
        <span className="mono-xs uppercase text-white/40">
          confidence · {confidence}
        </span>
      </div>
      <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ width: widthPct, background: color }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Connected signals — redesigned.
   No per-card lime/ice/amber tints. One unified palette. The grid
   is divided by hairlines, not individual bordered cards — so it
   reads as a single index, not a stack of templates.
   ────────────────────────────────────────────────────────────── */

function ConnectedSignalsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const reduceMotion = useReducedMotion();
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [36, 0],
  );

  return (
    <section
      ref={ref}
      data-surface="light"
      className="surface-chalk relative py-28 sm:py-36"
    >
      <div className="section-shell">
        <motion.div
          style={{ y: titleY }}
          className="mx-auto max-w-[780px] text-center"
        >
          <div className="kicker kicker-pitch">Chapter 05 · Design language</div>
          <h2 className="headline mt-5 text-[clamp(2.4rem,4.4vw,3.75rem)] text-[var(--on-chalk-1)]">
            Every signal earns its place on the page.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-7 text-[var(--on-chalk-3)]">
            Six product surfaces, one visual language. Color, motion, and
            hierarchy are tied to product meaning — not decoration.
          </p>
        </motion.div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/08">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {signalGrid.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="group relative flex items-start gap-5 bg-white/55 p-8 transition-colors duration-300 hover:bg-white"
                  style={{
                    borderRight:
                      (i + 1) % 3 !== 0 ? "1px solid rgba(6,16,11,0.08)" : "0",
                    borderBottom:
                      i < signalGrid.length - 3
                        ? "1px solid rgba(6,16,11,0.08)"
                        : "0",
                  }}
                >
                  {/* Accent rail — thin lime line that grows on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-8 bottom-8 w-[2px] origin-bottom scale-y-0 bg-[var(--lime)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <div className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-[var(--pitch)] text-[var(--on-pitch-1)] transition-colors duration-300 group-hover:text-[var(--lime)]">
                    <Icon className="size-[22px]" strokeWidth={1.8} />
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-4">
                    <div>
                      <ScrollFillNumber
                        size="1.15rem"
                        weight={700}
                        letterSpacing="0.04em"
                        outlineColor="rgba(6, 16, 11, 0.28)"
                        fillColor="var(--pitch)"
                      >
                        {s.n}
                      </ScrollFillNumber>
                      <div className="headline mt-2 text-[1.3rem] text-[var(--on-chalk-1)]">
                        {s.label}
                      </div>
                      <div className="mt-1 text-[0.85rem] text-[var(--on-chalk-3)]">
                        {s.role}
                      </div>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-4 text-[var(--on-chalk-4)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--on-chalk-1)]"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Final CTA — pitch, editorial
   ────────────────────────────────────────────────────────────── */

function FinalCTASection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduceMotion = useReducedMotion();
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [40, -40],
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="surface-pitch-gradient relative overflow-hidden py-24 sm:py-32"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(60% 60% at 80% 20%, rgba(181,255,93,0.12) 0%, transparent 60%)",
          opacity: mounted ? 1 : 0,
        }}
      />
      <div className="section-shell relative">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="kicker kicker-lime">Ready when the athlete is</div>
              <h2 className="headline mt-5 max-w-[20ch] text-[clamp(2.6rem,5vw,4.5rem)] text-white">
                Start with one athlete profile. Let trust build from week one.
              </h2>
              <p className="mt-6 max-w-xl text-[1.02rem] leading-7 text-white/62">
                Fourteen days, no card upfront. Build the profile, log a
                session, upload a clip, and see the system actually fit your
                week.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <TransitionLink href="/signup" className="btn-primary focus-ring">
                Start free
                <ArrowUpRight className="size-4" strokeWidth={2.6} />
              </TransitionLink>
              <TransitionLink href="/contact" className="btn-ghost-dark focus-ring">
                Talk pilot fit
                <CalendarDays className="size-4" />
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
