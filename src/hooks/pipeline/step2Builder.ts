import type { DataFrame } from "danfojs";
import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";
import type { SelectedFeature } from "@/stores/mlConfig";
import { getStep2Requirements } from "./requirements/step2Reqs";

interface Step2Params {
  isActive: boolean;
  hasDataset: boolean;
  isSplitReady: boolean;
  isExploreDirty: boolean;
  isDatasetDirty: boolean;
  xTrain: DataFrame | null;
  xTest: DataFrame | null;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
}

export function buildStep2(p: Step2Params): PipelineStepInfo {
  let status: StepStatus = "locked";
  if (p.isActive) status = "active";
  else if (!p.hasDataset) status = "locked";
  else if (p.isSplitReady) {
    status = p.isExploreDirty || p.isDatasetDirty ? "stale" : "completed";
  } else status = "active";

  const reqs = getStep2Requirements({
    hasDataset: p.hasDataset,
    targetColumn: p.targetColumn,
    selectedFeatures: p.selectedFeatures,
    isSplitReady: p.isSplitReady,
  });

  return {
    id: 2,
    key: "pretrain",
    title: "2. Pretrain & Split",
    shortTitle: "Pretrain",
    route: "/pretrain/explore",
    subRoutes: [
      "/pretrain/explore",
      "/pretrain/visualize",
      "/pretrain/analyze",
    ],
    status,
    isStale: p.isExploreDirty || p.isDatasetDirty,
    artifactDescription: p.isSplitReady
      ? `${p.xTrain?.shape[0]} train / ${p.xTest?.shape[0]} test`
      : null,
    requirements: reqs,
  };
}
