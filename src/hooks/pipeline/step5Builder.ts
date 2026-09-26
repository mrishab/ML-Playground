import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import { getStep5Requirements } from "./requirements/step4And5Reqs";

interface StepValidationParams {
  isActive: boolean;
  hasDataset: boolean;
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  isDownstreamStale: boolean;
  defaultTrainRoute: string;
}

export function buildStep5(p: StepValidationParams): PipelineStepInfo {
  const isLocked = !p.hasDataset || !p.isSplitReady || !p.hasTrainedModel;
  const status: StepStatus = p.isActive
    ? "active"
    : isLocked
      ? "locked"
      : p.isDownstreamStale
        ? "stale"
        : "completed";

  const reqs = getStep5Requirements({
    isSplitReady: p.isSplitReady,
    hasTrainedModel: p.hasTrainedModel,
    defaultTrainRoute: p.defaultTrainRoute,
  });

  return {
    id: 5,
    key: "validation",
    title: "5. Validation & Results",
    shortTitle: "Results",
    route: "/validation",
    subRoutes: ["/validation"],
    status,
    isStale: p.isDownstreamStale && p.hasTrainedModel,
    artifactDescription: p.hasTrainedModel ? "Evaluation Ready" : null,
    requirements: reqs,
  };
}
