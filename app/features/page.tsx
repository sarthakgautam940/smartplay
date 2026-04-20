import {
  ArrowUpRight,
  Brain,
  CalendarDays,
  Dumbbell,
  HeartPulse,
  LineChart,
  Salad,
  ShieldCheck,
  Target,
  UserSquare,
  Users,
  Video,
} from "lucide-react";

import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { Reveal } from "@/components/marketing/motion-primitives";
import { PublicShell } from "@/components/marketing/public-shell";
import { ScrollFillNumber } from "@/components/marketing/scroll-fill-number";
import { TransitionLink } from "@/components/marketing/transition-link";

const capabilities = [
  {
    n: "01",
    title: "Training log",
    surface: "Sessions",
    copy: "Type, duration, RPE, intensity, sprint count, touches, shots, tags, notes — turning effort into a pattern instead of memory.",
    icon: Dumbbell,
  },
  {
    n: "02",
    title: "Analytics",
    surface: "Trend reports",
    copy: "Training load, readiness, recovery, technical radar, match workload, nutrition adherence — read at a glance, exportable as a report.",
    icon: LineChart,
  },
  {
    n: "03",
    title: "Goals",
    surface: "Direction",
    copy: "Performance, fitness, nutrition, wellness, academic balance, and recruiting targets — with progress nudges, not lecture mode.",
    icon: Target,
  },
  {
    n: "04",
    title: "Wellness",
    surface: "Recovery",
    copy: "Sleep, soreness, fatigue, stress, energy, mood, hydration, pain flag, readiness score — recovery suggestions that respect medical limits.",
    icon: HeartPulse,
  },
  {
    n: "05",
    title: "Nutrition",
    surface: "Fueling",
    copy: "Meals, macros, hydration, simple fueling guidance, and budget-friendly options written for student-athlete reality.",
    icon: Salad,
  },
  {
    n: "06",
    title: "Video review",
    surface: "Film",
    copy: "Clip upload, frame sampling, structured soccer analysis, confidence labels, timestamped moments, and threaded coach comments.",
    icon: Video,
  },
  {
    n: "07",
    title: "Mindset",
    surface: "Mental",
    copy: "Confidence, focus, anxiety, motivation, pregame cues, journal prompts, and reflection habits — without diagnostics.",
    icon: Brain,
  },
  {
    n: "08",
    title: "Calendar",
    surface: "Schedule",
    copy: "Sessions, reminders, match days, team events, parent support moments, and completion context across the season.",
    icon: CalendarDays,
  },
];

const roleArchitecture = [
  {
    role: "Athlete",
    icon: Target,
    sees: "Their week. Their work. Their next adjustment.",
    detail:
      "Log, review, recover, fuel, reflect, and build a recruiting-ready profile they actually own.",
  },
  {
    role: "Coach",
    icon: Users,
    sees: "Roster readiness, submitted clips, drill assignments.",
    detail:
      "Trend-aware, comment-ready, with no surveillance of personal recovery details.",
  },
  {
    role: "Parent",
    icon: ShieldCheck,
    sees: "Big-picture progress and schedule.",
    detail:
      "Supportive visibility — not the coach view. Boundaries are explicit.",
  },
  {
    role: "Admin",
    icon: UserSquare,
    sees: "Adoption, program health, risk flags.",
    detail:
      "Operational signal at the program level for schools, clubs, and nonprofits.",
  },
];

export default function FeaturesPage() {
  return (
    <PublicShell>
      {/* Hero — typographic editorial, single column, no right-side card */}
      <section
        data-surface="dark"
        className="surface-pitch-gradient relative overflow-hidden"
      >
        <HeroBackdrop tone="pitch" variant="wide" />

        <div className="section-shell relative z-10 flex min-h-[calc(100svh-72px)] flex-col justify-between pt-20 pb-10 sm:pt-24 sm:pb-12">
          <div className="max-w-[1100px]">
            <div className="kicker kicker-lime">Features</div>

            <h1 className="headline-mega mt-6 text-[clamp(3.4rem,9vw,8rem)] text-white">
              <span className="block">Eight surfaces.</span>
              <span className="block text-[var(--lime)]">
                One serious week.
              </span>
            </h1>

            <p className="mt-10 max-w-2xl text-[1.08rem] leading-8 text-white/60 sm:text-[1.18rem]">
              Smartplay isn&apos;t a wellness app, a training log, or a film
              tool. It&apos;s the system that connects all of them — so the
              athlete sees one week instead of eight tabs.
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TransitionLink href="/signup" className="btn-primary focus-ring">
                Build your profile
                <ArrowUpRight className="size-4" strokeWidth={2.6} />
              </TransitionLink>
              <TransitionLink href="/pricing" className="btn-ghost-dark focus-ring">
                View live plan
              </TransitionLink>
            </div>
          </div>

          {/* Horizontal surface index — editorial footer of the hero */}
          <div className="mt-20 overflow-hidden">
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <span className="mono-xs uppercase text-white/38">
                The full surface map
              </span>
              <span className="mono-xs uppercase text-[var(--lime)]/70">
                08 / 08
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
              {capabilities.map((c) => (
                <div
                  key={c.n}
                  className="group flex flex-col gap-1.5 text-white/55 transition-colors hover:text-white"
                >
                  <ScrollFillNumber
                    size="2.2rem"
                    weight={500}
                    letterSpacing="-0.04em"
                    outlineColor="rgba(181, 255, 93, 0.35)"
                  >
                    {c.n}
                  </ScrollFillNumber>
                  <span className="text-[0.86rem] font-semibold leading-tight">
                    {c.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capability map */}
      <section data-surface="light" className="surface-chalk py-24 sm:py-32">
        <div className="section-shell">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="kicker kicker-pitch">Capabilities</div>
              <h2 className="headline mt-5 text-[clamp(2.4rem,4.4vw,3.75rem)] text-[var(--on-chalk-1)]">
                Each surface is built for a soccer job.
              </h2>
            </div>
            <p className="max-w-md text-[1rem] leading-7 text-[var(--on-chalk-3)]">
              No generic wellness tiles. Every capability maps back to a
              repeatable athlete, coach, parent, or program workflow.
            </p>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-2xl border border-[var(--on-chalk-1)]/08 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title}>
                  <div
                    className="group relative h-full bg-[var(--chalk)] p-7 transition-colors duration-300 hover:bg-white"
                    style={{
                      borderRight:
                        (i + 1) % 4 !== 0
                          ? "1px solid rgba(6,16,11,0.08)"
                          : "0",
                      borderBottom:
                        i < capabilities.length - 4
                          ? "1px solid rgba(6,16,11,0.08)"
                          : "0",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-8 bottom-8 w-[2px] origin-bottom scale-y-0 bg-[var(--lime)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    />
                    <div className="flex items-center justify-between">
                      <div className="grid size-10 place-items-center rounded-[10px] bg-[var(--pitch)] text-[var(--lime)] transition group-hover:scale-105">
                        <Icon className="size-5" strokeWidth={2} />
                      </div>
                      <span className="mono-xs uppercase text-[var(--on-chalk-4)]">
                        {c.n}
                      </span>
                    </div>
                    <div className="headline mt-8 text-[1.4rem] text-[var(--on-chalk-1)]">
                      {c.title}
                    </div>
                    <div className="mt-1 mono-xs uppercase text-[var(--on-chalk-4)]">
                      {c.surface}
                    </div>
                    <p className="mt-4 text-[0.88rem] leading-7 text-[var(--on-chalk-3)]">
                      {c.copy}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role architecture */}
      <section
        data-surface="dark"
        className="surface-pitch-gradient py-24 sm:py-32"
      >
        <div className="section-shell">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="kicker kicker-lime">Role architecture</div>
                <h2 className="headline mt-5 max-w-[18ch] text-[clamp(2.4rem,4.4vw,3.75rem)] text-white">
                  The same week. Four different responsibilities.
                </h2>
                <p className="mt-6 max-w-md text-[1rem] leading-7 text-white/60">
                  Smartplay keeps role boundaries explicit, so the product
                  feels useful to coaches and parents without making the
                  athlete feel watched from every direction.
                </p>
              </Reveal>
            </div>
            <div className="space-y-3">
              {roleArchitecture.map((r, i) => {
                const Icon = r.icon;
                return (
                  <Reveal key={r.role} delay={i * 0.05}>
                    <div className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[var(--lime)]/22 hover:bg-white/[0.05] sm:p-7">
                      <div className="flex items-baseline justify-between gap-6">
                        <div className="flex items-baseline gap-4">
                          <span className="mono-xs uppercase text-white/38">
                            0{i + 1}
                          </span>
                          <span className="headline text-[1.85rem] text-white">
                            {r.role}
                          </span>
                        </div>
                        <Icon
                          className="size-5 text-white/40 transition group-hover:text-[var(--lime)]"
                          strokeWidth={2}
                        />
                      </div>
                      <div className="mt-4 grid gap-1 sm:grid-cols-[1fr_1.5fr] sm:gap-8">
                        <div className="text-[0.92rem] font-semibold text-white">
                          {r.sees}
                        </div>
                        <div className="text-[0.9rem] leading-7 text-white/58">
                          {r.detail}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-surface="light" className="surface-chalk py-24 sm:py-28">
        <div className="section-shell">
          <div className="rounded-3xl border border-[var(--on-chalk-1)]/8 bg-white p-8 sm:p-12 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="kicker kicker-pitch">Try it on your week</div>
                <h2 className="headline mt-5 max-w-[20ch] text-[clamp(2.2rem,4vw,3.5rem)] text-[var(--on-chalk-1)]">
                  Spend a week inside the system. See what connects.
                </h2>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <TransitionLink href="/signup" className="btn-primary focus-ring">
                  Start the trial
                  <ArrowUpRight className="size-4" strokeWidth={2.6} />
                </TransitionLink>
                <TransitionLink href="/pricing" className="btn-ghost-light focus-ring">
                  See pricing
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
