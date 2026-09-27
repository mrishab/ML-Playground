import type { DataFrame } from "danfojs";

export interface FeatureDataResult {
  x: number[];
  y: number[];
  rawY: (number | string)[];
}

export function extractFeatureSeries(
  xTrain: DataFrame | null,
  yTrain: DataFrame | null,
  targetColumn: string | null,
  featureName: string,
): FeatureDataResult {
  if (!xTrain || !yTrain || !targetColumn) {
    return { x: [], y: [], rawY: [] };
  }
  const rawX = xTrain.column(featureName).values as unknown[];
  const rawTarget = yTrain.column(targetColumn).values as unknown[];

  const x: number[] = rawX.map(Number);
  const isAllNumeric = rawTarget.every(
    (v) => typeof v === "number" || (!isNaN(Number(v)) && v !== ""),
  );

  let y: number[] = [];
  if (isAllNumeric) {
    y = rawTarget.map(Number);
  } else {
    const unique = Array.from(new Set(rawTarget.map(String))).sort();
    const map = new Map(unique.map((val, idx) => [val, idx]));
    y = rawTarget.map((v) => map.get(String(v)) ?? 0);
  }

  return {
    x,
    y,
    rawY: rawTarget as (number | string)[],
  };
}
