import { Sparkles } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AIInsightCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Card
      className="relative overflow-hidden border-[var(--lime)]/18"
      style={{
        background:
          "linear-gradient(135deg, rgba(181,255,93,0.08) 0%, rgba(10,24,20,0.4) 54%, rgba(6,16,11,0.2) 100%)",
      }}
    >
      {/* Quiet tactical grid — subtle texture, not decoration */}
      <div
        aria-hidden="true"
        className="grid-pitch pointer-events-none absolute inset-0 opacity-30"
        style={{
          maskImage: "radial-gradient(70% 50% at 100% 0%, black, transparent)",
        }}
      />
      <CardHeader>
        <div className="flex items-center gap-2 text-[var(--lime)]">
          <Sparkles className="size-4" strokeWidth={2} />
          <span className="mono-xs uppercase tracking-[0.22em]">
            Smartplay says
          </span>
        </div>
        <CardTitle className="relative mt-4">{title}</CardTitle>
      </CardHeader>
      <p className="relative text-[0.92rem] leading-7 text-white/72">{body}</p>
    </Card>
  );
}
