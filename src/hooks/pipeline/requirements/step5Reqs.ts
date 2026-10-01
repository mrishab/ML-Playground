import type { StepRequirement } from "@/stores/pipeline";

interface Step5ReqParams {
  hasTrainedModel: boolean;
  hasSavedModels: boolean;
  defaultTrainRoute: string;
}

export function getStep5Requirements(p: Step5ReqParams): StepRequirement[] {
  const satisfied = p.hasTrainedModel || p.hasSavedModels;
  return [
    {
      id: "model-trained-or-saved",
      label: "Train or save a model",
      satisfied,
      missingMessage: "Complete model training in Step 4 to save and manage models.",
      actionRoute: p.defaultTrainRoute,
      actionLabel: "Go to Training",
    },
  ];
}
