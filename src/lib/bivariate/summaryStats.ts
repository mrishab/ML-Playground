import { getQuantile } from "@/lib/stats";
import type { ColumnSummaryStats } from "./types";

export type { ColumnSummaryStats };

export function calculateSummaryStats(values: number[]): ColumnSummaryStats {
  const n = values.length;
  if (n === 0) {
    return {
      count: 0,
      mean: 0,
      std: 0,
      min: 0,
      q25: 0,
      median: 0,
      q75: 0,
      max: 0,
      iqr: 0,
    };
  }

  const sorted = [...values].sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += sorted[i];
  }
  const mean = sum / n;

  let varianceSum = 0;
  for (let i = 0; i < n; i++) {
    const diff = sorted[i] - mean;
    varianceSum += diff * diff;
  }
  const std = n > 1 ? Math.sqrt(varianceSum / (n - 1)) : 0;

  const q25 = getQuantile(sorted, 0.25);
  const median = getQuantile(sorted, 0.5);
  const q75 = getQuantile(sorted, 0.75);

  return {
    count: n,
    mean,
    std,
    min: sorted[0],
    q25,
    median,
    q75,
    max: sorted[n - 1],
    iqr: q75 - q25,
  };
}
