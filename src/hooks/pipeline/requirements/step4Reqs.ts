import type { PipelineStepRequirement } from "@/stores/pipeline";

interface Step4ReqParams {
  hasDataset: boolean;
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  defaultTrainRoute: string;
}

export function getStep4Requirements({
  hasDataset,
  isSplitReady,
  hasTrainedModel,
  defaultTrainRoute,
}: Step4ReqParams): PipelineStepRequirement[] {
  return [
    {
      id: "req-train-dataset",
      label: "Dataset Selected",
      satisfied: hasDataset,
      missingMessage: "Select a dataset in Step 1.",
      actionRoute: "/data/select",
      actionLabel: "Select Dataset",
    },
    {
      id: "req-train-split",
      label: "Data Split Completed",
      satisfied: isSplitReady,
      missingMessage: "Create a train/test split in Step 2.",
      actionRoute: "/pretrain/explore",
      actionLabel: "Split Data",
    },
    {
      id: "req-train-model",
      label: "Train a Model",
      satisfied: hasTrainedModel,
      missingMessage: "Train at least one model in this step.",
      actionRoute: defaultTrainRoute,
      actionLabel: "Train Model",
    },
  ];
}
