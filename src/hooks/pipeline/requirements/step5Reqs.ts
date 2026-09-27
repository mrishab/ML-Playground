import type { PipelineStepRequirement } from "@/stores/pipeline";

interface Step5ReqParams {
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  defaultTrainRoute: string;
}

export function getStep5Requirements({
  isSplitReady,
  hasTrainedModel,
  defaultTrainRoute,
}: Step5ReqParams): PipelineStepRequirement[] {
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
      missingMessage: "Requires at least one trained model to compare.",
      actionRoute: defaultTrainRoute,
      actionLabel: "Train Model",
    },
  ];
}
