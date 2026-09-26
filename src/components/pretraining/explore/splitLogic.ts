import * as dfd from "danfojs";
import type { DataFrame } from "danfojs";
import { shuffleArray } from "@/lib/stats";
import { buildFeatureColumns } from "@/lib/featureTransforms";
import type { SelectedFeature } from "@/stores/mlConfig";
import type { FeatureSeriesData } from "@/types/dataset";

interface SplitParams {
  df: DataFrame;
  shuffle: boolean;
  testSplitPercent: number;
  selectedFeatures: SelectedFeature[];
  targetColumn: string;
}

export function executeDataSplit({
  df,
  shuffle,
  testSplitPercent,
  selectedFeatures,
  targetColumn,
}: SplitParams) {
  const nRows = df.shape[0];
  let indices = Array.from({ length: nRows }, (_, i) => i);
  if (shuffle) indices = shuffleArray(indices);

  const testSize = Math.floor(nRows * (testSplitPercent / 100));
  const trainSize = nRows - testSize;
  const trainIdx = indices.slice(0, trainSize);
  const testIdx = indices.slice(trainSize);

  const featureData = buildFeatureColumns(df, selectedFeatures);
  const xTrainData: FeatureSeriesData = {};
  const xTestData: FeatureSeriesData = {};

  for (const col of Object.keys(featureData)) {
    xTrainData[col] = trainIdx.map((i) => featureData[col][i]);
    xTestData[col] = testIdx.map((i) => featureData[col][i]);
  }

  const yValues = df.column(targetColumn).values as number[];
  return {
    xTrain: new dfd.DataFrame(xTrainData),
    xTest: new dfd.DataFrame(xTestData),
    yTrain: new dfd.DataFrame({
      [targetColumn]: trainIdx.map((i) => yValues[i]),
    }),
    yTest: new dfd.DataFrame({
      [targetColumn]: testIdx.map((i) => yValues[i]),
    }),
  };
}
