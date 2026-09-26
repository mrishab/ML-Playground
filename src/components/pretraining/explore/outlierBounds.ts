import type { DataFrame } from "danfojs";
import type { OutlierBoundsMap } from "@/types/dataset";
import type { computeColumnOutliers } from "./outlierDetection";

type ColumnOutlierItem = ReturnType<typeof computeColumnOutliers>[number];

export interface OutlierParams {
  df: DataFrame | null;
  numericColumns: string[];
  setDf: (df: DataFrame) => void;
  clearSplitData: () => void;
  resetTrainingResults: () => void;
}

export function buildOutlierBounds(
  items: ColumnOutlierItem[],
): OutlierBoundsMap {
  const bounds: OutlierBoundsMap = {};
  for (const e of items) bounds[e.column] = { lower: e.lower, upper: e.upper };
  return bounds;
}

export function sumOutliers(items: ColumnOutlierItem[]): number {
  return items.reduce((acc, e) => acc + e.outlierCount, 0);
}
