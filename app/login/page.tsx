import { CheckCircle2, ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/forms/login-form";
import { BrandWordmark } from "@/components/marketing/brand-mark";
import { PublicShell } from "@/components/marketing/public-shell";
import { TransitionLink } from "@/components/marketing/transition-link";

export default function LoginPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <PublicShell hideFooter>
      <section className="surface-pitch-gradient relative overflow-hidden">
        <div className="section-shell relative z-10 grid min-h-[calc(100vh-72px)] gap-14 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div className="max-w-[540px]">
            <div className="kicker kicker-lime">Secure access</div>
            <h1 className="headline-mega mt-6 text-[clamp(2.6rem,5.5vw,4.8rem)] text-white">
              Welcome back to
              <br />
              <BrandWordmark tone="dark" size="lg" className="mt-3" />
            </h1>
            <p className="mt-7 max-w-md text-[1.05rem] leading-7 text-white/62">
              Return to the athlete, coach, parent, or admin workspace that
              matches your role.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--lime)]/22 bg-[var(--lime)]/6 p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--lime)]" />
                <div className="text-[0.92rem] leading-7 text-white/72">
                  Demo accounts use password{" "}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white">
                    SmartPlay123!
                  </code>
                  . Use the credentials in the README to enter each role.
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-[0.85rem] text-white/52">
              {[
                "athlete.maya@smartplay.dev",
                "coach.lena@smartplay.dev",
                "parent.nicole@smartplay.dev",
                "admin@smartplay.dev",
              ].map((acc) => (
                <div key={acc} className="flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-[var(--lime)]/70" />
                  <code className="font-mono">{acc}</code>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[0.9rem] text-white/48">
              No account yet?{" "}
              <TransitionLink
                href="/signup"
                className="font-bold text-[var(--lime)] underline-offset-4 hover:underline"
              >
                Build your profile →
              </TransitionLink>
            </p>
          </div>

          <div className="lg:pl-6">
            <LoginForm googleEnabled={googleEnabled} />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
