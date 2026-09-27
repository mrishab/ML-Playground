import { create } from "zustand";
import type {
  MLConfigStore,
  TransformationType,
  ProblemType,
  SelectedFeature,
  SplitData,
} from "./mlConfig/types";
import { initialMLConfigState } from "./mlConfig/initialState";
import {
  createFeature,
  updateFeature,
  resetFeatureCounter,
} from "./mlConfig/featureActions";

export type { TransformationType, ProblemType, SelectedFeature, SplitData };

export const useMLConfigStore = create<MLConfigStore>()((set) => ({
  ...initialMLConfigState,
  setProblemType: (problemType) => set({ problemType }),
  setShuffle: (shuffle) => set({ shuffle }),
  setTestSplitPercent: (percent) => set({ testSplitPercent: percent }),
  setTargetColumn: (targetColumn) => set({ targetColumn }),
  addFeature: (col) =>
    set((s) => ({
      selectedFeatures: [...s.selectedFeatures, createFeature(col)],
    })),
  removeFeature: (id) =>
    set((s) => ({
      selectedFeatures: s.selectedFeatures.filter((f) => f.id !== id),
    })),
  updateFeatureTransformation: (id, trans, opts) =>
    set((s) => ({
      selectedFeatures: updateFeature(s.selectedFeatures, id, trans, opts),
    })),
  clearFeatures: () => set({ selectedFeatures: [] }),
  setFeatures: (features) => set({ selectedFeatures: features }),
  setSplitData: (d) => set({ ...d, isSplit: true }),
  clearSplitData: () =>
    set({
      xTrain: null,
      xTest: null,
      yTrain: null,
      yTest: null,
      isSplit: false,
    }),
  reset: () => {
    resetFeatureCounter();
    set(initialMLConfigState);
  },
}));
