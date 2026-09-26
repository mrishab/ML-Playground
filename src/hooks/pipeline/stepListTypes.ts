import type { DataFrame } from "danfojs";
import type { SelectedFeature } from "@/stores/mlConfig";

export interface PipelineStepListParams {
  hasDataset: boolean;
  selectedDataset: string;
  df: DataFrame | null;
  isSplitReady: boolean;
  xTrain: DataFrame | null;
  xTest: DataFrame | null;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
  hasTrainedModel: boolean;
  modelDesc: string | null;
  isExploreDirty: boolean;
  isDatasetDirty: boolean;
  isDownstreamStale: boolean;
  defaultTrainRoute: string;
  defaultCompareRoute: string;
}
