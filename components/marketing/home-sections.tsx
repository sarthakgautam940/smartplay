"use client";

import {
  motion,
  useInView,
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
  Dumbbell,
  HeartPulse,
  Salad,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Reveal } from "@/components/marketing/motion-primitives";
import { RoleLensSection } from "@/components/marketing/role-lens-section";
import { ScrollFillNumber } from "@/components/marketing/scroll-fill-number";
import { TransitionLink } from "@/components/marketing/transition-link";
import { useScrollVelocity } from "@/components/marketing/use-scroll-velocity";

/* ──────────────────────────────────────────────────────────────
   Section data
   ────────────────────────────────────────────────────────────── */

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
  {
    label: "Cue A",
    title: "Plant foot set earlier before the finish.",
    meta: "00:14 · high confidence",
  },
  {
    label: "Cue B",
    title: "Protect technique once fatigue appears late.",
    meta: "00:42 · medium confidence",
  },
  {
    label: "Cue C",
    title: "Repeat the cleaner approach angle tomorrow.",
    meta: "01:08 · labeled lower",
  },
];

/* ──────────────────────────────────────────────────────────────
   Page assembly
   ────────────────────────────────────────────────────────────── */

export function HomeSections() {
  return (
    <>
      <RoleLensSection />
      <WeekLoopSection />
      <AIProofSection />
      <ConnectedSignalsSection />
      <FinalCTASection />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   Week loop — pitch surface, sequential reveal on rail.
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
      className="surface-pitch-gradient relative section-pad"
    >
      <div className="section-shell">
        <div className="grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="kicker kicker-lime">The week loop</div>
              <h2 className="t-display-sm mt-5 max-w-[15ch] text-balance text-white">
                Scroll feels like the season clicking into place.
              </h2>
              <p className="t-lede mt-6 max-w-md text-pretty text-white/62">
                Log the work, read the body, review the clip, adjust before the
                next session. Each beat unlocks as you move down the page.
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
   AI proof — chapter 4. Mechanical entrance (corner brackets →
   body → comet ignite). Comet-glow perimeter whose angle is
   driven by scroll velocity with momentum (slow baseline at rest,
   accelerates with scroll, reverses on scroll-up). Three right-
   side cues stagger in from the lower-right on scroll-down; when
   the user scrolls past, they tilt + dim rather than reversing.
   ────────────────────────────────────────────────────────────── */

function AIProofSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  // Clip scrub bars — scroll-driven
  const bar1 = useTransform(scrollYProgress, [0.05, 0.55], [0, 0.72]);
  const bar2 = useTransform(scrollYProgress, [0.2, 0.75], [0, 0.5]);
  const bar3 = useTransform(scrollYProgress, [0.35, 0.9], [0, 0.85]);
  const t1Sec = useTransform(scrollYProgress, [0.05, 0.55], [0, 14]);
  const t2Sec = useTransform(scrollYProgress, [0.2, 0.75], [0, 42]);
  const t3Sec = useTransform(scrollYProgress, [0.35, 0.9], [0, 68]);

  // Mechanical entrance stages
  const frameRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(frameRef, { margin: "-20% 0px -20% 0px", once: true });
  const [stage, setStage] = useState(0); // 0 hidden → 1 corners → 2 body → 3 glow
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setStage(3);
      return;
    }
    const t1 = window.setTimeout(() => setStage(1), 40);
    const t2 = window.setTimeout(() => setStage(2), 320);
    const t3 = window.setTimeout(() => setStage(3), 760);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [inView, reduceMotion]);

  // Comet angle, driven by scroll velocity with momentum
  const { subscribe } = useScrollVelocity({ baseline: 14, boost: 1.4, max: 180 });
  useEffect(() => {
    const el = frameRef.current;
    if (!el || reduceMotion) return;
    let angle = 0;
    let last = performance.now();
    let currentDps = 14; // stored dps value
    const unsub = subscribe((dps) => {
      currentDps = dps;
    });
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      angle = (angle + currentDps * dt) % 360;
      el.style.setProperty("--comet-angle", `${angle.toFixed(2)}deg`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      unsub();
    };
  }, [subscribe, reduceMotion]);

  return (
    <section
      ref={ref}
      data-surface="light"
      className="surface-chalk relative overflow-hidden section-pad"
    >
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* LEFT — coachable-moments card */}
          <div className="order-2 lg:order-1">
            <div
              ref={frameRef}
              className="mech-frame comet-frame relative"
              data-stage={stage}
              style={
                {
                  "--comet-opacity": stage >= 3 ? 0.9 : 0,
                } as CSSProperties
              }
            >
              <span className="mech-corner tl" aria-hidden="true" />
              <span className="mech-corner tr" aria-hidden="true" />
              <span className="mech-corner bl" aria-hidden="true" />
              <span className="mech-corner br" aria-hidden="true" />

              <div
                data-surface="dark"
                className="mech-body relative overflow-hidden rounded-2xl p-6 text-white sm:p-8"
                style={{
                  background:
                    "linear-gradient(180deg, #0d1a15 0%, #0a1613 58%, #0b1812 100%)",
                  boxShadow:
                    "0 40px 100px -50px rgba(6,16,11,0.45), inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="grid-pitch absolute inset-0 opacity-[0.35]"
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
                      <div className="t-h3 mt-2 text-white">
                        Three coachable moments
                      </div>
                    </div>
                    <div className="grid size-11 place-items-center rounded-[10px] border border-[var(--lime)]/20 bg-[var(--lime)]/6 text-[var(--lime)]">
                      <Video className="size-5" strokeWidth={1.8} />
                    </div>
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

                  <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-4 text-[0.9rem] leading-6 text-white/72">
                    <div className="mono-xs uppercase text-[var(--lime)]/85">
                      Smartplay says
                    </div>
                    <p className="mt-2">
                      Cleaner first touch protects the final 15 minutes. Repeat
                      the approach angle from 00:14 tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — headline + three coaching-cue boxes */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="kicker kicker-pitch">Honest AI</div>
              <h2 className="t-display-sm mt-5 max-w-[18ch] text-balance text-[var(--on-chalk-1)]">
                AI is useful here because it stays inside the work.
              </h2>
              <p className="t-lede mt-6 max-w-lg text-pretty text-[var(--on-chalk-3)]">
                Smartplay samples clips, reads athlete context, and produces
                structured coaching points. When the model has less to work
                with, it labels the uncertainty plainly — instead of pretending
                to know.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-3">
              {aiCues.map((cue, i) => (
                <AICueCard
                  key={cue.title}
                  cue={cue}
                  index={i}
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

/* ──────────────────────────────────────────────────────────────
   AI cue card — directional in/out.
   Entry (downward scroll through section):
     translate (24, 18) → (0, 0), opacity 0 → 1
   Exit (continuing past section):
     rotate 0 → 2°, opacity 1 → 0.42 — not a reverse of the entry.
   ────────────────────────────────────────────────────────────── */
function AICueCard({
  cue,
  index,
  scrollYProgress,
}: {
  cue: (typeof aiCues)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const entryStart = 0.18 + index * 0.08;
  const entryEnd = entryStart + 0.12;
  const exitStart = 0.78;
  const exitEnd = 0.96;

  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.42],
  );
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd],
    reduceMotion ? [0, 0] : [24, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [entryStart, entryEnd],
    reduceMotion ? [0, 0] : [18, 0],
  );
  const rotate = useTransform(
    scrollYProgress,
    [exitStart, exitEnd],
    reduceMotion ? [0, 0] : [0, 2],
  );

  return (
    <motion.div
      style={{ opacity, x, y, rotate }}
      className="group relative flex items-start gap-4 rounded-xl border border-[var(--on-chalk-1)]/8 bg-white/70 p-4 transition-[border-color,background] duration-300 hover:border-[var(--lime-deep)]/40 hover:bg-white"
    >
      <span className="mono-xs mt-1 shrink-0 rounded bg-[var(--pitch)] px-1.5 py-0.5 uppercase text-[var(--lime)] transition-transform duration-300 group-hover:scale-[1.06]">
        {cue.label}
      </span>
      <div className="flex-1">
        <p className="text-[0.95rem] leading-6 text-[var(--on-chalk-1)]">
          {cue.title}
        </p>
        <div className="mono-xs mt-1 uppercase text-[var(--on-chalk-4)]">
          {cue.meta}
        </div>
      </div>
      <ArrowUpRight
        className="mt-1 size-4 shrink-0 text-[var(--on-chalk-4)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--on-chalk-1)]"
        strokeWidth={2}
      />
    </motion.div>
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
      className="surface-chalk relative section-pad"
    >
      <div className="section-shell">
        <motion.div
          style={{ y: titleY }}
          className="mx-auto max-w-[780px] text-center"
        >
          <div className="kicker kicker-pitch">Design language</div>
          <h2 className="t-display-sm mt-5 text-balance text-[var(--on-chalk-1)]">
            Every signal earns its place on the page.
          </h2>
          <p className="t-lede mx-auto mt-6 max-w-xl text-pretty text-[var(--on-chalk-3)]">
            Six product surfaces, one visual language. Color, motion, and
            hierarchy are tied to product meaning — not decoration.
          </p>
        </motion.div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/08">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {signalGrid.map((s, i) => (
              <SignalTile key={s.label} s={s} i={i} total={signalGrid.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Signal tile — diagonal wave stagger.
   Row (i/3) and column (i%3) combine so tiles enter on a
   descending-right wave instead of a single linear block. */
function SignalTile({
  s,
  i,
  total,
}: {
  s: (typeof signalGrid)[number];
  i: number;
  total: number;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = s.icon;
  const row = Math.floor(i / 3);
  const col = i % 3;
  const delay = reduceMotion ? 0 : (row + col) * 0.07;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-start gap-5 bg-white/55 p-8 transition-colors duration-300 hover:bg-white"
      style={{
        borderRight:
          (i + 1) % 3 !== 0 ? "1px solid rgba(6,16,11,0.08)" : "0",
        borderBottom:
          i < total - 3 ? "1px solid rgba(6,16,11,0.08)" : "0",
      }}
    >
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
          <div className="t-h3 mt-2 text-[1.3rem] text-[var(--on-chalk-1)]">
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
    </motion.div>
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
      className="surface-pitch-gradient relative overflow-hidden section-pad"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(58% 58% at 82% 22%, rgba(181,255,93,0.12) 0%, transparent 60%)",
          opacity: mounted ? 1 : 0,
        }}
      />
      <div className="section-shell relative">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="kicker kicker-lime">Ready when the athlete is</div>
              <h2 className="t-display mt-5 max-w-[18ch] text-balance text-white">
                Start a week.
              </h2>
              <p className="t-lede mt-6 max-w-xl text-pretty text-white/62">
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
              <span className="mono-xs mt-1 uppercase text-white/42">
                No card · $12/mo after
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
