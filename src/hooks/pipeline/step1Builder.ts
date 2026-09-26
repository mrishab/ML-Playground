import type { DataFrame } from "danfojs";
import type { PipelineStepInfo, StepStatus } from "@/stores/pipeline";

interface Step1Params {
  isActive: boolean;
  hasDataset: boolean;
  isDatasetDirty: boolean;
  selectedDataset: string;
  df: DataFrame | null;
}

export function buildStep1({
  isActive,
  hasDataset,
  isDatasetDirty,
  selectedDataset,
  df,
}: Step1Params): PipelineStepInfo {
  const status: StepStatus = isActive
    ? "active"
    : hasDataset
      ? isDatasetDirty
        ? "stale"
        : "completed"
      : "active";

  return {
    id: 1,
    key: "dataset",
    title: "1. Dataset Ingestion",
    shortTitle: "Dataset",
    route: "/data/select",
    subRoutes: ["/data/select", "/data/transform"],
    status,
    isStale: isDatasetDirty,
    artifactDescription: hasDataset
      ? `${selectedDataset} (${df?.shape[0] ?? 0} rows)`
      : null,
    requirements: [
      {
        id: "req-dataset-selected",
        label: "Select a Dataset",
        satisfied: hasDataset,
        missingMessage: "Select a dataset from the catalog.",
        actionRoute: "/data/select",
        actionLabel: "Choose Dataset",
      },
    ],
  };
}
