import { create } from "zustand";
import type { ProblemType, SelectedFeature } from "./mlConfig";
import { useDatasetStore } from "./dataset";
import { useMLConfigStore } from "./mlConfig";
import { useTrainingResultsStore } from "./trainingResults";

export type StepId = 1 | 2 | 3 | 4 | 5;

export type StepStatus = "completed" | "active" | "locked" | "stale";

export type StepRequirement = {
  id: string;
  label: string;
  satisfied: boolean;
  missingMessage: string;
  actionRoute: string;
  actionLabel: string;
};

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

type PipelineState = {
  // Dirty / Stale tracking
  pendingDataset: string | null;
  lastSplitConfig: LastSplitConfig | null;

  // Locked step modal state
  lockedModalStep: PipelineStepInfo | null;
  isLockedModalOpen: boolean;
};

type PipelineActions = {
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

export const usePipelineStore = create<PipelineState & PipelineActions>()(
  (set, get) => ({
    pendingDataset: null,
    lastSplitConfig: null,
    lockedModalStep: null,
    isLockedModalOpen: false,

    setPendingDataset: (dataset) => set({ pendingDataset: dataset }),

    revertDatasetChange: () => {
      set({ pendingDataset: null });
    },

    commitDatasetChange: (name, df) => {
      // Cleanly commit dataset change and purge downstream artifacts
      useDatasetStore.getState().setSelectedDataset(name);
      useDatasetStore.getState().setDf(df);
      useMLConfigStore.getState().clearSplitData();
      useMLConfigStore.getState().clearFeatures();
      useMLConfigStore.getState().setTargetColumn("");
      useTrainingResultsStore.getState().resetAll();

      set({
        pendingDataset: null,
        lastSplitConfig: null,
      });
    },

    recordSplit: (config) => {
      set({
        lastSplitConfig: {
          datasetName: config.datasetName,
          problemType: config.problemType,
          targetColumn: config.targetColumn,
          selectedFeatures: [...config.selectedFeatures],
          testSplitPercent: config.testSplitPercent,
          shuffle: config.shuffle,
        },
      });
    },

    revertExploreChanges: () => {
      const { lastSplitConfig } = get();
      if (!lastSplitConfig) return;

      const mlStore = useMLConfigStore.getState();
      mlStore.setProblemType(lastSplitConfig.problemType);
      mlStore.setTargetColumn(lastSplitConfig.targetColumn);
      mlStore.setFeatures(lastSplitConfig.selectedFeatures);
      mlStore.setTestSplitPercent(lastSplitConfig.testSplitPercent);
      mlStore.setShuffle(lastSplitConfig.shuffle);
    },

    clearSplitTracking: () => {
      set({ lastSplitConfig: null });
    },

    openLockedModal: (step) =>
      set({ lockedModalStep: step, isLockedModalOpen: true }),
    closeLockedModal: () =>
      set({ lockedModalStep: null, isLockedModalOpen: false }),

    resetAll: () =>
      set({
        pendingDataset: null,
        lastSplitConfig: null,
        lockedModalStep: null,
        isLockedModalOpen: false,
      }),
  }),
);

/**
 * Calculates whether the current exploration settings differ from the committed split config.
 */
export function areExploreSettingsDirty(
  lastSplitConfig: LastSplitConfig | null,
  current: {
    datasetName: string;
    problemType: ProblemType;
    targetColumn: string;
    selectedFeatures: SelectedFeature[];
    testSplitPercent: number;
    shuffle: boolean;
  },
): boolean {
  if (!lastSplitConfig) return false;
  if (lastSplitConfig.datasetName !== current.datasetName) return true;
  if (lastSplitConfig.problemType !== current.problemType) return true;
  if (lastSplitConfig.targetColumn !== current.targetColumn) return true;
  if (lastSplitConfig.testSplitPercent !== current.testSplitPercent)
    return true;
  if (lastSplitConfig.shuffle !== current.shuffle) return true;

  if (
    lastSplitConfig.selectedFeatures.length !== current.selectedFeatures.length
  )
    return true;

  for (let i = 0; i < lastSplitConfig.selectedFeatures.length; i++) {
    const f1 = lastSplitConfig.selectedFeatures[i];
    const f2 = current.selectedFeatures[i];
    if (!f2) return true;
    if (f1.column !== f2.column || f1.transformation !== f2.transformation)
      return true;
    if (f1.polynomialDegree !== f2.polynomialDegree) return true;
    if (f1.interactionWith !== f2.interactionWith) return true;
  }

  return false;
}
