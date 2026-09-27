import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import { getStep3Requirements } from "./requirements/step3Reqs";

interface Step3Params {
  isActive: boolean;
  hasDataset: boolean;
  isSplitReady: boolean;
  hasTrainedModel: boolean;
  isDownstreamStale: boolean;
  defaultTrainRoute: string;
  modelArtifactDesc: string | null;
}

export function buildStep3(p: Step3Params): PipelineStepInfo {
  let status: StepStatus = "locked";
  if (p.isActive) status = "active";
  else if (!p.hasDataset || !p.isSplitReady) status = "locked";
  else if (p.hasTrainedModel) {
    status = p.isDownstreamStale ? "stale" : "completed";
  } else status = "active";

  const reqs = getStep3Requirements({
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
    hasTrainedModel: p.hasTrainedModel,
    defaultTrainRoute: p.defaultTrainRoute,
  });

  return {
    id: 3,
    key: "train",
    title: "3. Model Training",
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
