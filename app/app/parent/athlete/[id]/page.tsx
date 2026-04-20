import { notFound } from "next/navigation";

import { getParentWorkspace } from "@/lib/data/service";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return [{ id: "user-athlete-maya" }];
}

export default async function ParentAthletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const viewer = { id: "user-parent-nicole" };
  const { id } = await params;
  const workspace = await getParentWorkspace(viewer.id);
  const athlete = workspace.athletes.find((entry) => entry.id === id);

  if (!athlete) {
    notFound();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="space-y-4">
        <div className="font-display text-2xl font-semibold text-white">{athlete.name}</div>
        {athlete.alerts.map((alert) => (
          <div key={alert} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-slate-200">
            {alert}
          </div>
        ))}
      </Card>
      <Card className="space-y-4">
        <div className="font-display text-2xl font-semibold text-white">Coach notes</div>
        {athlete.coachComments.map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-slate-200">
            {comment.content}
          </div>
        ))}
      </Card>
    </div>
  );
}
