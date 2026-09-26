import type { StateCreator } from "zustand";
import type { PipelineState, PipelineActions } from "./types";
import {
  handleCommitDatasetChange,
  handleRevertExplore,
} from "./pipelineActions";

export type PipelineStore = PipelineState & PipelineActions;

export const createPipelineSlice: StateCreator<PipelineStore> = (set, get) => ({
  pendingDataset: null,
  lastSplitConfig: null,
  lockedModalStep: null,
  isLockedModalOpen: false,

  setPendingDataset: (dataset) => set({ pendingDataset: dataset }),
  revertDatasetChange: () => set({ pendingDataset: null }),

  commitDatasetChange: (name, df) => {
    handleCommitDatasetChange(name, df);
    set({ pendingDataset: null, lastSplitConfig: null });
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

  revertExploreChanges: () => handleRevertExplore(get().lastSplitConfig),

  clearSplitTracking: () => set({ lastSplitConfig: null }),
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
});
