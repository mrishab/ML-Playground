import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import { getStep3Requirements } from "./requirements/step3Reqs";

interface Step3Params {
  isActive: boolean;
  hasDataset: boolean;
  isSplitReady: boolean;
  isExploreDirty: boolean;
  isDatasetDirty: boolean;
}

export function buildStep3(p: Step3Params): PipelineStepInfo {
  let status: StepStatus = "locked";
  if (p.isActive) status = "active";
  else if (!p.hasDataset || !p.isSplitReady) status = "locked";
  else {
    status = p.isExploreDirty || p.isDatasetDirty ? "stale" : "completed";
  }

  const reqs = getStep3Requirements({
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
  });

  return {
    id: 3,
    key: "analyze",
    title: "3. Feature Analysis",
    shortTitle: "Analyze",
    route: "/analyze",
    subRoutes: [
      "/analyze",
      "/pretrain/analyze",
      "/pretrain/visualize",
      "/visualize",
    ],
    status,
    isStale: p.isExploreDirty || p.isDatasetDirty,
    artifactDescription: p.isSplitReady ? "Features Ready" : null,
    requirements: reqs,
  };
}
