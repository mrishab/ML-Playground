import { StaleWarningBanner } from "@/components/pipeline/StaleWarningBanner";

interface ExploreWarningBannerProps {
  onRevert: () => void;
  onRecompute: () => void;
}

export function ExploreWarningBanner({
  onRevert,
  onRecompute,
}: ExploreWarningBannerProps) {
  return (
    <StaleWarningBanner
      title="Settings Modified"
      message="Split settings changed. Re-splitting will reset downstream models."
      onRevert={onRevert}
      revertLabel="Revert Settings"
      onRecompute={onRecompute}
      recomputeLabel="Re-split Data"
    />
  );
}
