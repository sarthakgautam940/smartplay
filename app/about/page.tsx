import type { Metadata } from "next";

import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  HeartPulse,
  Minus,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { Reveal } from "@/components/marketing/motion-primitives";
import { PublicShell } from "@/components/marketing/public-shell";
import { TransitionLink } from "@/components/marketing/transition-link";

export const metadata: Metadata = {
  title: "About Smartplay",
  description:
    "Serious soccer development should not depend on elite access. Built for athletes 13–19 and the adults around them — practical structure, honest AI, role-aware support.",
};

const principles = [
  {
    n: "01",
    icon: Target,
    title: "Specific beats generic.",
    text: "Weak-foot reps, match load, sprint exposure, recovery day, scanning, first touch, film moments. The product language is the sport's language.",
  },
  {
    n: "02",
    icon: HeartPulse,
    title: "Support beats pressure.",
    text: "Readiness and wellness signals help athletes adjust, not feel judged. No gamified streaks. No badges as the primary motivator.",
  },
  {
    n: "03",
    icon: Compass,
    title: "Access beats exclusivity.",
    text: "Home training, equipment-light drills, budget meals, school schedules — first-class design constraints, not afterthoughts.",
  },
  {
    n: "04",
    icon: Sparkles,
    title: "Honesty beats hype.",
    text: "AI guidance stays bounded by visible data and athlete context. Fallbacks are labeled plainly. Confidence is shown, not implied.",
  },
];

const refuses = [
  "AI does not replace coaches, scouts, or trainers.",
  "No medical, therapy, injury, nutrition, or recruiting guarantees.",
  "No parent controls that turn support into surveillance.",
  "No premium-resource assumptions as the default path.",
  "No promise that effort alone produces outcomes.",
  "No fake testimonials, fake logos, or vanity metrics.",
];

export default function AboutPage() {
  return (
    <PublicShell>
      {/* Hero — split surface, editorial */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div
            data-surface="dark"
            className="surface-pitch-gradient relative overflow-hidden flex items-center px-5 py-24 sm:px-10 sm:py-32 lg:py-40"
          >
            <HeroBackdrop tone="pitch" />
            <div className="mx-auto max-w-[640px]">
              <div className="kicker kicker-lime">About Smartplay</div>
              <h1 className="t-display mt-6 max-w-[16ch] text-balance text-white">
                Serious soccer development should not depend on elite access.
              </h1>
              <p className="t-lede mt-8 max-w-xl text-pretty text-white/64">
                Smartplay is built for student-athletes and the adults around
                them: practical structure, honest AI, role-aware support, and
                next actions that fit real life — without a pro-club budget.
              </p>
            </div>
          </div>
          <div
            data-surface="light"
            className="surface-chalk relative flex items-center px-5 py-20 sm:px-10 sm:py-28 lg:py-40"
          >
            <div className="mx-auto w-full max-w-[460px]">
              <div className="kicker kicker-pitch">Brand standard</div>
              <div className="mt-6 space-y-1">
                {[
                  "Pressure down.",
                  "Specificity up.",
                  "Every cue earns its place.",
                ].map((line) => (
                  <div
                    key={line}
                    className="t-h2 text-[var(--on-chalk-1)]"
                  >
                    {line}
                  </div>
                ))}
              </div>
              <div className="hair-divider-light mt-10" />
              <div className="mt-6 grid grid-cols-2 gap-6 text-[0.85rem]">
                <div>
                  <div className="mono-xs uppercase text-[var(--on-chalk-4)]">
                    Built for
                  </div>
                  <div className="mt-1 text-[var(--on-chalk-2)]">
                    Athletes 13–19 + the adults around them
                  </div>
                </div>
                <div>
                  <div className="mono-xs uppercase text-[var(--on-chalk-4)]">
                    Built against
                  </div>
                  <div className="mt-1 text-[var(--on-chalk-2)]">
                    Hype apps. Generic wellness. Surveillance.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thesis — single composition, no stranded columns */}
      <section data-surface="light" className="surface-chalk section-pad">
        <div className="section-shell">
          {/* Intro — centered, calm, commands the section before principles appear */}
          <Reveal>
            <div className="mx-auto max-w-[820px] text-center">
              <div className="kicker kicker-pitch">The thesis</div>
              <h2 className="t-display-sm mt-5 text-balance text-[var(--on-chalk-1)]">
                A calm coach beside the athlete.
              </h2>
              <p className="t-lede mx-auto mt-7 max-w-2xl text-pretty text-[var(--on-chalk-3)]">
                Smartplay is not a hype app, not a medical tool, not a
                pro-club simulator. It&apos;s a field-intelligence system
                that helps the athlete, coach, and family make the next useful
                decision — week after week, without burning out the people
                around them.
              </p>
            </div>
          </Reveal>

          {/* Principles — hairline-separated index, not a 2x2 card grid */}
          <div className="mt-20 overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/08">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="group relative bg-white/55 p-8 transition-colors duration-300 hover:bg-white sm:p-9"
                    style={{
                      borderRight:
                        i % 2 === 0 ? "1px solid rgba(6,16,11,0.08)" : "0",
                      borderBottom:
                        i < principles.length - 2
                          ? "1px solid rgba(6,16,11,0.08)"
                          : "0",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-9 bottom-9 w-[2px] origin-bottom scale-y-0 bg-[var(--lime)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    />
                    <div className="flex items-center justify-between">
                      <div className="grid size-11 place-items-center rounded-[10px] bg-[var(--pitch)] text-[var(--lime)]">
                        <Icon className="size-5" strokeWidth={2} />
                      </div>
                      <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
                        {p.n}
                      </span>
                    </div>
                    <div className="t-h3 mt-8 text-[1.55rem] text-[var(--on-chalk-1)]">
                      {p.title}
                    </div>
                    <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-[var(--on-chalk-3)]">
                      {p.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Refuses — what we will not pretend */}
      <section
        data-surface="dark"
        className="surface-pitch-gradient section-pad"
      >
        <div className="section-shell">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
            <Reveal>
              <div>
                <div className="kicker kicker-lime">What we refuse to overclaim</div>
                <h2 className="t-display-sm mt-5 max-w-[18ch] text-balance text-white">
                  The list of things Smartplay will not pretend to do.
                </h2>
                <p className="t-lede mt-6 max-w-md text-pretty text-white/62">
                  Trust is built by what a brand declines as much as by what
                  it ships. This page is here so families can read it before
                  they pay anything.
                </p>
                <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
                  <ShieldCheck className="size-4 text-[var(--lime)]" />
                  <span className="mono-xs uppercase text-white/68">
                    Honesty as positioning
                  </span>
                </div>
              </div>
            </Reveal>
            <div className="space-y-3">
              {refuses.map((r, i) => (
                <Reveal key={r} delay={i * 0.04}>
                  <div className="flex items-baseline gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                    <Minus className="mt-1 size-4 shrink-0 text-[var(--lime)]" />
                    <div className="text-[0.95rem] leading-7 text-white/72">
                      {r}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section data-surface="light" className="surface-chalk section-pad">
        <div className="section-shell">
          <div className="rounded-3xl border border-[var(--on-chalk-1)]/8 bg-white p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="kicker kicker-pitch">Product promise</div>
                <h2 className="t-display-sm mt-5 max-w-[20ch] text-balance text-[var(--on-chalk-1)]">
                  Progress without perfectionism.
                </h2>
                <p className="t-lede mt-6 max-w-lg text-pretty text-[var(--on-chalk-3)]">
                  Smartplay gives the athlete a clearer picture of effort,
                  recovery, and improvement — while preserving the human
                  support system around them.
                </p>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Target, label: "Athlete first" },
                    { icon: HeartPulse, label: "Wellness aware" },
                    { icon: ShieldCheck, label: "Trust by default" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="card-chalk-soft flex items-center gap-3 p-4"
                    >
                      <Icon className="size-4 text-[var(--pitch)]" />
                      <span className="text-[0.88rem] font-bold text-[var(--on-chalk-1)]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <TransitionLink href="/signup" className="btn-primary focus-ring">
                  Start free
                  <ArrowUpRight className="size-4" strokeWidth={2.6} />
                </TransitionLink>
                <TransitionLink href="/contact" className="btn-ghost-light focus-ring">
                  Talk pilot fit
                </TransitionLink>
                <div className="mt-2 inline-flex items-center gap-2 text-[0.82rem] text-[var(--on-chalk-3)]">
                  <CheckCircle2 className="size-3.5 text-[var(--pitch)]" />
                  Built for athletes 13–19 and the adults around them
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
