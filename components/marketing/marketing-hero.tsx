"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef } from "react";

import { TransitionLink } from "@/components/marketing/transition-link";

/**
 * Hero — Sunday morning 06:47. The page opens with restraint.
 * Typography does the work. A quiet field-plot motif anchors the
 * right side. Entrance is a 3-stage choreograph: kicker → headline
 * mask-reveal → subhead + CTA settle. Scroll-out is a gentle parallax
 * descent, not a curtain split.
 */
export function MarketingHero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -60],
  );
  const plotY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 40],
  );
  const fade = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section
      ref={sectionRef}
      data-surface="dark"
      className="hero-pitch relative overflow-hidden"
    >
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="section-shell relative z-10 grid min-h-[calc(100svh-72px)] grid-cols-12 items-center gap-x-10 section-pad"
      >
        {/* LEFT — headline block */}
        <div className="col-span-12 lg:col-span-7">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="kicker kicker-lime">SUN · 06:47</span>
            <span aria-hidden="true" className="block h-px w-10 bg-white/20" />
            <span className="kicker" style={{ color: "rgba(247, 248, 239, 0.48)" }}>
              sunday plan
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="t-display mt-7 max-w-[18ch] text-balance text-white"
          >
            The week works harder when it&apos;s{" "}
            <span className="text-[var(--lime)]">specific</span>.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="t-lede mt-8 max-w-[48ch] text-pretty text-white/62"
          >
            Smartplay ties a serious soccer week together — session, recovery,
            film, mindset — and shows the athlete, coach, and parent a view
            that actually fits them. Pressure down. Specificity up.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <TransitionLink href="/signup" className="btn-primary focus-ring">
              Start a 14-day trial
              <ArrowUpRight className="size-4" strokeWidth={2.6} />
            </TransitionLink>
            <TransitionLink href="/features" className="btn-ghost-dark focus-ring">
              <Play className="size-3.5 fill-current" strokeWidth={0} />
              See how the week connects
            </TransitionLink>
            <span className="ml-0 flex items-center gap-2 text-[0.78rem] text-white/45 sm:ml-2">
              <span className="size-1 rounded-full bg-white/35" />
              No card · $12/mo after
            </span>
          </motion.div>
        </div>

        {/* RIGHT — field-plot motif. Quiet, data-native, not decorative. */}
        <motion.div
          style={{ y: plotY }}
          className="hidden lg:col-span-5 lg:block"
          aria-hidden="true"
        >
          <FieldPlot />
        </motion.div>
      </motion.div>

      {/* Ticker proof rail — three quiet, specific lines, not feature bullets */}
      <ProofTicker />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Field-plot motif — half-field rendering with the athlete's
   Sunday-plan path traced. Deliberately static, only the trace
   line animates. A quiet data object, not a demo. Soccer-specific.
   ────────────────────────────────────────────────────────────── */
function FieldPlot() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
      <svg
        viewBox="0 0 400 500"
        fill="none"
        className="h-full w-full"
        style={{ color: "rgba(255,255,255,0.18)" }}
      >
        {/* Outer field frame */}
        <rect x="18" y="18" width="364" height="464" rx="4" stroke="currentColor" strokeWidth="1" />
        {/* Halfway line across the top */}
        <line x1="18" y1="250" x2="382" y2="250" stroke="currentColor" strokeWidth="1" />
        {/* Center circle */}
        <circle cx="200" cy="250" r="58" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="250" r="2" fill="var(--lime)" />
        {/* Bottom penalty box */}
        <rect x="108" y="376" width="184" height="106" stroke="currentColor" strokeWidth="1" />
        <rect x="150" y="442" width="100" height="40" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="420" r="1.6" fill="currentColor" />

        {/* Sunday-plan trace — athlete's planned movement */}
        <motion.path
          d="M 200 250 C 220 300, 170 330, 190 370 S 240 420, 220 470"
          stroke="var(--lime)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* End node */}
        <motion.circle
          cx="220"
          cy="470"
          r="4"
          fill="var(--lime)"
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.4 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 2.1 }}
        />
      </svg>

      {/* Floating session meta — monospace, aligned to the plot */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-0 top-6 w-[170px] rounded-[10px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm"
      >
        <div className="mono-xs uppercase text-white/45">Tue · session</div>
        <div className="mt-1 text-[0.92rem] font-semibold text-white">Tempo · 62 min</div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="mono-xs text-white/55">RPE</span>
          <span className="mono-xs font-bold text-[var(--lime)]">6 / 10</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="mono-xs text-white/55">Sprint</span>
          <span className="mono-xs font-bold text-white">11</span>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute left-2 bottom-12 w-[180px] rounded-[10px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm"
      >
        <div className="mono-xs uppercase text-white/45">Readiness</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-[3px] flex-1 rounded-full bg-white/10">
            <div
              style={{ width: "72%", background: "var(--lime)" }}
              className="h-full rounded-full"
            />
          </div>
          <span className="mono-xs font-bold text-white">72</span>
        </div>
        <div className="mt-2 text-[0.7rem] text-white/50">
          Sleep 7h · soreness low
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Proof ticker — three specific facts, quietly delivered.
   Replaces the 4-tile proof rail. Horizontal, monospace, calm.
   ────────────────────────────────────────────────────────────── */
function ProofTicker() {
  return (
    <div className="relative z-10 border-t border-white/6">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-y-4 py-5 text-[0.82rem] text-white/58 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-white/6">
          <div className="flex items-center gap-3 pr-6">
            <span className="size-1.5 rounded-full bg-[var(--lime)]" />
            <span className="mono-xs uppercase text-white/42">Trial</span>
            <span className="text-white">14 days — no card.</span>
          </div>
          <div className="flex items-center gap-3 pr-6 sm:pl-6">
            <span className="size-1.5 rounded-full bg-white/30" />
            <span className="mono-xs uppercase text-white/42">Player</span>
            <span className="text-white">$12/mo, cancel anytime.</span>
          </div>
          <div className="flex items-center gap-3 sm:pl-6">
            <span className="size-1.5 rounded-full bg-white/30" />
            <span className="mono-xs uppercase text-white/42">AI</span>
            <span className="text-white">Bounded, labeled, never hidden.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
