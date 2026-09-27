import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import { getStep5Requirements } from "./requirements/step5Reqs";

interface Step5Params {
  isActive: boolean;
  hasDataset: boolean;
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  isDownstreamStale: boolean;
  defaultCompareRoute: string;
  defaultTrainRoute: string;
}

export function buildStep5(p: Step5Params): PipelineStepInfo {
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
    key: "comparison",
    title: "5. Model Comparison",
    shortTitle: "Comparison",
    route: p.defaultCompareRoute,
    subRoutes: [
      "/comparison/regression",
      "/comparison/classification",
      "/comparison/clustering",
    ],
    status,
    isStale: p.isDownstreamStale && p.hasTrainedModel,
    artifactDescription: p.hasTrainedModel ? "Comparison Ready" : null,
    requirements: reqs,
  };
}
