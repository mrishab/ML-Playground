import type { PipelineStepRequirement } from "@/stores/pipeline";
import type { SelectedFeature } from "@/stores/mlConfig";

interface Step2ReqParams {
  hasDataset: boolean;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
  isSplitReady: boolean;
}

export function getStep2Requirements({
  hasDataset,
  targetColumn,
  selectedFeatures,
  isSplitReady,
}: Step2ReqParams): PipelineStepRequirement[] {
  return [
    {
      id: "req-df-loaded",
      label: "Dataset Selected",
      satisfied: hasDataset,
      missingMessage: "Select a dataset in Step 1.",
      actionRoute: "/data/select",
      actionLabel: "Select Dataset",
    },
    {
      id: "req-target-chosen",
      label: "Target Variable Selected",
      satisfied: targetColumn !== "",
      missingMessage: "Select a target column.",
      actionRoute: "/pretrain/explore",
      actionLabel: "Select Target",
    },
    {
      id: "req-features-chosen",
      label: "Features Selected",
      satisfied: selectedFeatures.length > 0,
      missingMessage: "Select one or more input features.",
      actionRoute: "/pretrain/explore",
      actionLabel: "Select Features",
    },
    {
      id: "req-split-done",
      label: "Train/Test Split Created",
      satisfied: isSplitReady,
      missingMessage: "Create a train/test split.",
      actionRoute: "/pretrain/explore",
      actionLabel: "Create Split",
    },
  ];
}
