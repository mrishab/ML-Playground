import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import { getStep4Requirements } from "./requirements/step4And5Reqs";

interface StepCompareParams {
  isActive: boolean;
  hasDataset: boolean;
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  isDownstreamStale: boolean;
  defaultCompareRoute: string;
  defaultTrainRoute: string;
}

export function buildStep4(p: StepCompareParams): PipelineStepInfo {
  const isLocked = !p.hasDataset || !p.isSplitReady || !p.hasTrainedModel;
  const status: StepStatus = p.isActive
    ? "active"
    : isLocked
      ? "locked"
      : p.isDownstreamStale
        ? "stale"
        : "completed";

  const reqs = getStep4Requirements({
    isSplitReady: p.isSplitReady,
    hasTrainedModel: p.hasTrainedModel,
    defaultTrainRoute: p.defaultTrainRoute,
  });

  return {
    id: 4,
    key: "comparison",
    title: "4. Model Comparison",
    shortTitle: "Comparison",
    route: p.defaultCompareRoute,
    subRoutes: [
      "/comparison/regression",
      "/comparison/classification",
      "/comparison/clustering",
    ],
    status,
    isStale: p.isDownstreamStale && p.hasTrainedModel,
    artifactDescription: p.hasTrainedModel ? "Metrics" : null,
    requirements: reqs,
  };
}
