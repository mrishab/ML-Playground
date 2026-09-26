import { StaleWarningBanner } from "@/components/pipeline/StaleWarningBanner";

interface DatasetPendingBannerProps {
  pendingDataset: string | null;
  selectedDataset: string | null;
  revertDatasetChange: () => void;
  handleApplyPendingDataset: () => void;
}

export function DatasetPendingBanner({
  pendingDataset,
  selectedDataset,
  revertDatasetChange,
  handleApplyPendingDataset,
}: DatasetPendingBannerProps) {
  if (!pendingDataset || pendingDataset === selectedDataset) return null;

  return (
    <StaleWarningBanner
      title="Switch Dataset?"
      message={`Switching to '${pendingDataset}' will reset downstream splits and models for '${selectedDataset}'.`}
      onRevert={revertDatasetChange}
      revertLabel={`Keep ${selectedDataset}`}
      onRecompute={handleApplyPendingDataset}
      recomputeLabel={`Switch to ${pendingDataset}`}
    />
  );
}
