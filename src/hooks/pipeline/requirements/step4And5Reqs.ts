import type { PipelineStepRequirement } from "@/stores/pipeline";

interface DownstreamReqParams {
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  defaultTrainRoute: string;
}

export function getStep4Requirements({
  isSplitReady,
  hasTrainedModel,
  defaultTrainRoute,
}: DownstreamReqParams): PipelineStepRequirement[] {
  return [
    {
      id: "req-comp-split",
      label: "Data Split Completed",
      satisfied: isSplitReady,
      missingMessage: "Requires data split from Step 2.",
      actionRoute: "/pretrain/explore",
      actionLabel: "Split Data",
    },
    {
      id: "req-comp-trained",
      label: "Model Trained",
      satisfied: hasTrainedModel,
      missingMessage: "Requires at least one trained model.",
      actionRoute: defaultTrainRoute,
      actionLabel: "Train Model",
    },
  ];
}

export function getStep5Requirements({
  isSplitReady,
  hasTrainedModel,
  defaultTrainRoute,
}: DownstreamReqParams): PipelineStepRequirement[] {
  return [
    {
      id: "req-val-split",
      label: "Data Split Completed",
      satisfied: isSplitReady,
      missingMessage: "Requires data split from Step 2.",
      actionRoute: "/pretrain/explore",
      actionLabel: "Split Data",
    },
    {
      id: "req-val-trained",
      label: "Model Evaluated",
      satisfied: hasTrainedModel,
      missingMessage: "Requires trained model metrics.",
      actionRoute: defaultTrainRoute,
      actionLabel: "Train Model",
    },
  ];
}
