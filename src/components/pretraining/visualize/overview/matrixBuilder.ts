import { calculatePearsonCorrelation } from "@/lib/bivariate";
import type { FeatureSeriesData } from "@/types/dataset";

export function buildCorrelationMatrix(
  columns: string[],
  vectors: FeatureSeriesData,
): number[][] {
  const matrix: number[][] = [];
  for (let i = 0; i < columns.length; i++) {
    const row: number[] = [];
    const colA = columns[i];
    for (let j = 0; j < columns.length; j++) {
      const colB = columns[j];
      if (i === j) {
        row.push(1);
      } else {
        const r = calculatePearsonCorrelation(vectors[colA], vectors[colB]);
        row.push(Number(r.toFixed(3)));
      }
    }
    matrix.push(row);
  }
  return matrix;
}
