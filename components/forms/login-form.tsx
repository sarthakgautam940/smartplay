"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setLoading(true);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Invalid credentials.");
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <div className="grid gap-4">
      <div className="public-panel p-5 sm:p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Label htmlFor="email" className="text-white/76">Email</Label>
            <Input
              id="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white/76">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              {...form.register("password")}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="public-focus-ring inline-flex h-[50px] items-center justify-center gap-3 rounded-md bg-lime-300 px-5 text-sm font-black text-[#06110d] transition hover:-translate-y-0.5 hover:bg-lime-200 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Log in
          </button>
          {googleEnabled ? (
            <button
              type="button"
              className="public-focus-ring inline-flex h-[50px] items-center justify-center rounded-md border border-white/12 px-5 text-sm font-bold text-white/78 transition hover:border-white/30 hover:text-white"
              onClick={() => signIn("google", { callbackUrl: "/app" })}
            >
              Continue with Google
            </button>
          ) : null}
        </form>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/6 p-5">
        <div className="public-kicker">
          Role-aware workspace
        </div>
        <div className="mt-5 space-y-3 text-sm leading-7 text-white/66">
          <p>
            SmartPlay routes you to the right home after sign-in: athlete,
            coach, parent, or admin.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {["Athlete dashboard", "Coach command", "Parent overview", "Admin snapshot"].map(
              (item) => (
                <div key={item} className="rounded-md border border-white/10 bg-[#07110d]/62 px-3 py-2 text-white/72">
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
