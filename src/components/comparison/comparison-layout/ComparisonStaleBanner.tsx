import { useNavigate } from "react-router-dom";
import { StaleWarningBanner } from "@/components/pipeline/StaleWarningBanner";
import { usePipelineStore } from "@/stores/pipeline";

interface ComparisonStaleBannerProps {
  isStale: boolean;
  hasAnyTrained: boolean;
  noModelsLinkTo: string;
}

export function ComparisonStaleBanner({
  isStale,
  hasAnyTrained,
  noModelsLinkTo,
}: ComparisonStaleBannerProps) {
  const navigate = useNavigate();
  const revertExploreChanges = usePipelineStore(
    (state) => state.revertExploreChanges,
  );

  if (!isStale || !hasAnyTrained) return null;

  return (
    <StaleWarningBanner
      title="Results May Be Outdated"
      message="Data split parameters changed after training. Re-split or re-train to update results."
      onRevert={revertExploreChanges}
      revertLabel="Revert Split Changes"
      onRecompute={() => navigate(noModelsLinkTo)}
      recomputeLabel="Go to Training"
    />
  );
}
