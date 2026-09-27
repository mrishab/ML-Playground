import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import { getStep4Requirements } from "./requirements/step4Reqs";

interface Step4Params {
  isActive: boolean;
  hasDataset: boolean;
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  isDownstreamStale: boolean;
  defaultTrainRoute: string;
  modelArtifactDesc: string | null;
}

export function buildStep4(p: Step4Params): PipelineStepInfo {
  let status: StepStatus = "locked";
  if (p.isActive) status = "active";
  else if (!p.hasDataset || !p.isSplitReady) status = "locked";
  else if (p.hasTrainedModel) {
    status = p.isDownstreamStale ? "stale" : "completed";
  } else status = "active";

  const reqs = getStep4Requirements({
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
    hasTrainedModel: p.hasTrainedModel,
    defaultTrainRoute: p.defaultTrainRoute,
  });

  return {
    id: 4,
    key: "train",
    title: "4. Model Training",
    shortTitle: "Training",
    route: p.defaultTrainRoute,
    subRoutes: [
      "/train/linear",
      "/train/knn",
      "/train/lda",
      "/train/logistic",
      "/train/clustering",
    ],
    status,
    isStale: p.isDownstreamStale && p.hasTrainedModel,
    artifactDescription: p.modelArtifactDesc,
    requirements: reqs,
  };
}
