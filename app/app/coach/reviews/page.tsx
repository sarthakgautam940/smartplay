import { VideoReviewCard } from "@/components/video-review-card";
import { getCoachWorkspace } from "@/lib/data/service";
import { Card } from "@/components/ui/card";

export default async function CoachReviewsPage() {
  const viewer = { id: "user-coach-lena", role: "coach" as const };
  const workspace = await getCoachWorkspace(viewer.id);

  return (
    <div className="space-y-6">
      <Card className="space-y-2">
        <div className="font-display text-xl font-semibold text-white">Video review queue</div>
        <p className="text-sm text-slate-300">
          Review player footage, add coach notes, and turn clips into specific next-session
          work.
        </p>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        {workspace.pendingReviews.map((video) => (
          <VideoReviewCard
            key={video.id}
            video={video}
            href={`/app/videos/${video.id}`}
          />
        ))}
      </div>
    </div>
  );
}
