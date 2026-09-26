import { StaleWarningBanner } from "@/components/pipeline/StaleWarningBanner";
import { usePipelineStore } from "@/stores/pipeline";

interface TrainingStaleBannerProps {
  isStale: boolean;
  hasMetrics: boolean;
  onRun: () => void;
}

export function TrainingStaleBanner({
  isStale,
  hasMetrics,
  onRun,
}: TrainingStaleBannerProps) {
  const revertExploreChanges = usePipelineStore(
    (state) => state.revertExploreChanges,
  );

  if (!isStale || !hasMetrics) return null;

  return (
    <StaleWarningBanner
      title="Model Outdated"
      message="Data split settings changed after training. Re-train to update results."
      onRevert={revertExploreChanges}
      revertLabel="Revert Settings"
      onRecompute={onRun}
      recomputeLabel="Re-train Model"
    />
  );
}
