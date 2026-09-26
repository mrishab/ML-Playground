/**
 * Build a confusion matrix from predicted and actual label arrays.
 * matrix[actualIndex][predictedIndex] = count
 */
export function buildConfusionMatrix(
  actuals: string[],
  predictions: string[],
  labels: string[],
): number[][] {
  const labelIndex = new Map(labels.map((l, i) => [l, i]));
  const size = labels.length;
  const matrix: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(0),
  );

  for (let i = 0; i < actuals.length; i++) {
    const ai = labelIndex.get(actuals[i]);
    const pi = labelIndex.get(predictions[i]);
    if (ai !== undefined && pi !== undefined) {
      matrix[ai][pi]++;
    }
  }

  return matrix;
}
