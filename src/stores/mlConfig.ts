import { create } from "zustand";
import type { DataFrame } from "danfojs";

export type TransformationType = "none" | "polynomial" | "interaction";

export type SelectedFeature = {
  id: string;
  column: string;
  transformation: TransformationType;
  polynomialDegree?: number;
  interactionWith?: string;
};

type MLConfigState = {
  // Configuration
  shuffle: boolean;
  testSplitPercent: number;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];

  // Split data
  xTrain: DataFrame | null;
  xTest: DataFrame | null;
  yTrain: DataFrame | null;
  yTest: DataFrame | null;

  // Status
  isSplit: boolean;
};

type MLConfigActions = {
  setShuffle: (shuffle: boolean) => void;
  setTestSplitPercent: (percent: number) => void;
  setTargetColumn: (column: string) => void;
  addFeature: (column: string) => void;
  removeFeature: (id: string) => void;
  updateFeatureTransformation: (
    id: string,
    transformation: TransformationType,
    options?: { polynomialDegree?: number; interactionWith?: string },
  ) => void;
  clearFeatures: () => void;
  setSplitData: (data: {
    xTrain: DataFrame;
    xTest: DataFrame;
    yTrain: DataFrame;
    yTest: DataFrame;
  }) => void;
  clearSplitData: () => void;
  reset: () => void;
};

const initialState: MLConfigState = {
  shuffle: true,
  testSplitPercent: 20,
  targetColumn: "",
  selectedFeatures: [],
  xTrain: null,
  xTest: null,
  yTrain: null,
  yTest: null,
  isSplit: false,
};

let featureIdCounter = 0;

const generateFeatureId = () => {
  featureIdCounter += 1;
  return `feature-${featureIdCounter}`;
};

export const useMLConfigStore = create<MLConfigState & MLConfigActions>()(
  (set) => ({
    ...initialState,

    setShuffle: (shuffle) => set({ shuffle, isSplit: false }),

    setTestSplitPercent: (percent) =>
      set({ testSplitPercent: percent, isSplit: false }),

    setTargetColumn: (column) => set({ targetColumn: column, isSplit: false }),

    addFeature: (column) =>
      set((state) => ({
        selectedFeatures: [
          ...state.selectedFeatures,
          {
            id: generateFeatureId(),
            column,
            transformation: "none" as TransformationType,
          },
        ],
        isSplit: false,
      })),

    removeFeature: (id) =>
      set((state) => ({
        selectedFeatures: state.selectedFeatures.filter((f) => f.id !== id),
        isSplit: false,
      })),

    updateFeatureTransformation: (id, transformation, options) =>
      set((state) => ({
        selectedFeatures: state.selectedFeatures.map((f) =>
          f.id === id
            ? {
                ...f,
                transformation,
                polynomialDegree:
                  options?.polynomialDegree ?? f.polynomialDegree,
                interactionWith: options?.interactionWith ?? f.interactionWith,
              }
            : f,
        ),
        isSplit: false,
      })),

    clearFeatures: () => set({ selectedFeatures: [], isSplit: false }),

    setSplitData: (data) =>
      set({
        xTrain: data.xTrain,
        xTest: data.xTest,
        yTrain: data.yTrain,
        yTest: data.yTest,
        isSplit: true,
      }),

    clearSplitData: () =>
      set({
        xTrain: null,
        xTest: null,
        yTrain: null,
        yTest: null,
        isSplit: false,
      }),

    reset: () => {
      featureIdCounter = 0;
      set(initialState);
    },
  }),
);
