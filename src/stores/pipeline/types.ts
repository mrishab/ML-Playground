import type { ProblemType, SelectedFeature } from "@/stores/mlConfig";

export type StepId = 1 | 2 | 3 | 4;

export type StepStatus = "completed" | "active" | "locked" | "stale";

export type StepRequirement = {
  id: string;
  label: string;
  satisfied: boolean;
  missingMessage: string;
  actionRoute: string;
  actionLabel: string;
};
export type PipelineStepRequirement = StepRequirement;

export type PipelineStepInfo = {
  id: StepId;
  key: string;
  title: string;
  shortTitle: string;
  route: string;
  subRoutes: string[];
  status: StepStatus;
  isStale: boolean;
  artifactDescription: string | null;
  requirements: StepRequirement[];
};

export type LastSplitConfig = {
  datasetName: string;
  problemType: ProblemType;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
  testSplitPercent: number;
  shuffle: boolean;
};

export type PipelineState = {
  pendingDataset: string | null;
  lastSplitConfig: LastSplitConfig | null;
  lockedModalStep: PipelineStepInfo | null;
  isLockedModalOpen: boolean;
};

export type PipelineActions = {
  setPendingDataset: (dataset: string | null) => void;
  revertDatasetChange: () => void;
  commitDatasetChange: (name: string, df: import("danfojs").DataFrame) => void;
  recordSplit: (config: LastSplitConfig) => void;
  revertExploreChanges: () => void;
  clearSplitTracking: () => void;
  openLockedModal: (step: PipelineStepInfo) => void;
  closeLockedModal: () => void;
  resetAll: () => void;
};
