import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import { getStep5Requirements } from "./requirements/step5Reqs";

interface Step5Params {
  isActive: boolean;
  hasTrainedModel: boolean;
  hasSavedModels: boolean;
  savedModelsCount: number;
  defaultTrainRoute: string;
}

export function buildStep5(p: Step5Params): PipelineStepInfo {
  let status: StepStatus = "locked";
  if (p.isActive) status = "active";
  else if (p.hasSavedModels || p.hasTrainedModel) status = "completed";
  else status = "locked";

  const reqs = getStep5Requirements({
    hasTrainedModel: p.hasTrainedModel,
    hasSavedModels: p.hasSavedModels,
    defaultTrainRoute: p.defaultTrainRoute,
  });

  return {
    id: 5,
    key: "models",
    title: "5. Saved Models",
    shortTitle: "Models",
    route: "/models",
    subRoutes: ["/models"],
    status,
    isStale: false,
    artifactDescription: p.savedModelsCount > 0 ? `${p.savedModelsCount} Saved` : null,
    requirements: reqs,
  };
}
