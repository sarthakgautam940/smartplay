import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { SignupWizard } from "@/components/forms/signup-wizard";
import { PublicShell } from "@/components/marketing/public-shell";

const pillars = [
  "14-day athlete trial starts with profile creation.",
  "Coach and parent accounts enter role-aware workspaces.",
  "Wellness and injury fields are practical, never diagnostic.",
];

export default function SignupPage() {
  return (
    <PublicShell hideFooter>
      <section className="surface-pitch-gradient relative overflow-hidden">
        <div className="section-shell relative z-10 grid gap-14 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:py-24">
          <div className="lg:sticky lg:top-28">
            <div className="kicker kicker-lime">Get started</div>
            <h1 className="headline-mega mt-6 text-[clamp(2.6rem,5.5vw,4.8rem)] text-white">
              Build your
              <br />
              Smartplay profile.
            </h1>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-7 text-white/62">
              Start with the context that makes coaching useful: role,
              training reality, soccer goals, equipment access, and support
              needs. Ten minutes, then the system fits your week.
            </p>

            <div className="mt-9 grid gap-3">
              {pillars.map((p) => (
                <div
                  key={p}
                  className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-4 text-[0.92rem] leading-6 text-white/70"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--lime)]" />
                  {p}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--lime)]/22 bg-[var(--lime)]/6 p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--lime)]" />
                <p className="text-[0.9rem] leading-6 text-white/74">
                  The public onboarding flow only creates the account and role
                  profile. Deeper team connections and program rollout come
                  later — when they&apos;ve earned the right to.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[0.82rem] text-white/48">
              <Sparkles className="size-3.5 text-[var(--lime)]/70" />
              No card required for the athlete trial
            </div>
          </div>

          <SignupWizard />
        </div>
      </section>
    </PublicShell>
  );
}
