import type { PerClassMetrics } from "@/types/classification";

/**
 * Compute per-class precision, recall, F1-score from a confusion matrix.
 */
export function computePerClassMetrics(
  matrix: number[][],
  labels: string[],
): PerClassMetrics[] {
  const size = labels.length;

  return labels.map((label, i) => {
    const tp = matrix[i][i];

    let fp = 0;
    for (let row = 0; row < size; row++) {
      if (row !== i) fp += matrix[row][i];
    }

    let fn = 0;
    for (let col = 0; col < size; col++) {
      if (col !== i) fn += matrix[i][col];
    }

    const support = tp + fn;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1Score =
      precision + recall > 0
        ? (2 * precision * recall) / (precision + recall)
        : 0;

    return { label, precision, recall, f1Score, support };
  });
}
