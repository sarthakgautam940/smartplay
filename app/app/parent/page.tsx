import Link from "next/link";

import { getParentWorkspace } from "@/lib/data/service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function ParentPage() {
  const viewer = { id: "user-parent-nicole", role: "parent" as const };
  const workspace = await getParentWorkspace(viewer.id);

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {workspace.athletes.map((athlete) => (
        <Card key={athlete.id} className="space-y-4">
          <div className="font-display text-2xl font-semibold text-white">{athlete.name}</div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-sm text-slate-400">Consistency</div>
              <div className="mt-1 text-2xl font-semibold text-white">{athlete.consistency}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Readiness</div>
              <div className="mt-1 text-2xl font-semibold text-white">{athlete.readiness}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Goal progress</div>
              <div className="mt-1 text-2xl font-semibold text-white">{athlete.goalProgress}%</div>
            </div>
          </div>
          <Button asChild variant="secondary">
            <Link href={`/app/parent/athlete/${athlete.id}`}>View athlete</Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
