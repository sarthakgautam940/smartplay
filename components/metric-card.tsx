import { ArrowUpRight } from "lucide-react";

import { TrendBadge } from "@/components/trend-badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  change,
  subtitle,
}: {
  label: string;
  value: string | number;
  change: number;
  subtitle?: string;
}) {
  return (
    <Card className="group relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5">
      <span
        aria-hidden="true"
        className="absolute left-0 top-6 bottom-6 w-[2px] origin-bottom scale-y-0 bg-[var(--lime)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
      <CardHeader>
        <div>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="mt-3 text-[1.85rem] leading-none tracking-[-0.02em]">
            {value}
          </CardTitle>
        </div>
        <TrendBadge value={change} />
      </CardHeader>
      <div className="flex items-center justify-between text-[0.82rem] text-white/55">
        <span>{subtitle ?? "vs. previous week"}</span>
        <ArrowUpRight
          className="size-3.5 text-white/35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          strokeWidth={2.4}
        />
      </div>
    </Card>
  );
}
