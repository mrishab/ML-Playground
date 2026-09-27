import type { DataFrame } from "danfojs";

export type * from "./featureTypes";
import type {
  ProblemType,
  SelectedFeature,
  TransformationType,
} from "./featureTypes";

export type MLConfigState = {
  problemType: ProblemType;
  shuffle: boolean;
  testSplitPercent: number;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
  xTrain: DataFrame | null;
  xTest: DataFrame | null;
  yTrain: DataFrame | null;
  yTest: DataFrame | null;
  isSplit: boolean;
};

export type SplitData = {
  xTrain: DataFrame;
  xTest: DataFrame;
  yTrain: DataFrame;
  yTest: DataFrame;
};

export type MLConfigActions = {
  setProblemType: (problemType: ProblemType) => void;
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
  setFeatures: (features: SelectedFeature[]) => void;
  setSplitData: (data: SplitData) => void;
  clearSplitData: () => void;
  reset: () => void;
};

export type MLConfigStore = MLConfigState & MLConfigActions;
