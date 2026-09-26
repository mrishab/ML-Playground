import type { DataFrame } from "danfojs";
import type {
  SelectedFeature,
  SplitData,
  ProblemType,
} from "@/stores/mlConfig";

export interface ExploreSplitHookParams {
  df: DataFrame | null;
  shuffle: boolean;
  testSplitPercent: number;
  selectedFeatures: SelectedFeature[];
  targetColumn: string;
  problemType: ProblemType;
  selectedDataset: string;
  resetTrainingResults: () => void;
  setSplitData: (data: SplitData) => void;
  isSplit: boolean;
  xTrain: DataFrame | null;
  xTest: DataFrame | null;
}
