import type {
  ClassificationMetrics,
  PerClassMetrics,
  ClassROC,
  ROCPoint,
} from "@/types/classification";

/**
 * Build a confusion matrix from predicted and actual label arrays.
 * matrix[actualIndex][predictedIndex] = count
 */
function buildConfusionMatrix(
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

/**
 * Compute per-class precision, recall, F1-score from a confusion matrix.
 */
function computePerClassMetrics(
  matrix: number[][],
  labels: string[],
): PerClassMetrics[] {
  const size = labels.length;

  return labels.map((label, i) => {
    const tp = matrix[i][i];

    // FP: sum of column i minus tp (predicted as i but actually something else)
    let fp = 0;
    for (let row = 0; row < size; row++) {
      if (row !== i) fp += matrix[row][i];
    }

    // FN: sum of row i minus tp (actually i but predicted as something else)
    let fn = 0;
    for (let col = 0; col < size; col++) {
      if (col !== i) fn += matrix[i][col];
    }

    // Support: total actual instances of this class (sum of row i)
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

/**
 * Compute ROC curve for a single class using one-vs-rest approach.
 * Uses prediction "scores" derived from k-NN voting fractions.
 *
 * When no probability scores are available (hard predictions only),
 * we generate a minimal 3-point ROC curve from TP/FP counts.
 */
function computeClassROC(
  actuals: string[],
  predictions: string[],
  targetLabel: string,
  scores?: number[],
): ClassROC {
  const binaryActual = actuals.map((a) => (a === targetLabel ? 1 : 0));

  if (!scores) {
    // Hard-prediction fallback: compute single operating point
    let tp = 0,
      fp = 0,
      fn = 0,
      tn = 0;
    for (let i = 0; i < actuals.length; i++) {
      const actual = binaryActual[i];
      const predicted = predictions[i] === targetLabel ? 1 : 0;
      if (actual === 1 && predicted === 1) tp++;
      else if (actual === 0 && predicted === 1) fp++;
      else if (actual === 1 && predicted === 0) fn++;
      else tn++;
    }
    const tpr = tp + fn > 0 ? tp / (tp + fn) : 0;
    const fpr = fp + tn > 0 ? fp / (fp + tn) : 0;

    const points: ROCPoint[] = [
      { fpr: 0, tpr: 0, threshold: Infinity },
      { fpr, tpr, threshold: 0.5 },
      { fpr: 1, tpr: 1, threshold: -Infinity },
    ];

    // AUC via trapezoidal rule on the 3 points
    const auc = computeAUC(points);
    return { label: targetLabel, points, auc };
  }

  // Full ROC with probability scores
  const indexed = binaryActual.map((label, i) => ({
    label,
    score: scores[i],
  }));
  indexed.sort((a, b) => b.score - a.score);

  const totalPositive = binaryActual.filter((v) => v === 1).length;
  const totalNegative = binaryActual.length - totalPositive;

  const points: ROCPoint[] = [{ fpr: 0, tpr: 0, threshold: Infinity }];
  let tpCount = 0;
  let fpCount = 0;

  for (let i = 0; i < indexed.length; i++) {
    if (indexed[i].label === 1) tpCount++;
    else fpCount++;

    const tpr = totalPositive > 0 ? tpCount / totalPositive : 0;
    const fpr = totalNegative > 0 ? fpCount / totalNegative : 0;

    // Only add point if fpr or tpr changed from last point
    const last = points[points.length - 1];
    if (fpr !== last.fpr || tpr !== last.tpr) {
      points.push({ fpr, tpr, threshold: indexed[i].score });
    }
  }

  // Ensure we end at (1, 1)
  const last = points[points.length - 1];
  if (last.fpr !== 1 || last.tpr !== 1) {
    points.push({ fpr: 1, tpr: 1, threshold: -Infinity });
  }

  const auc = computeAUC(points);
  return { label: targetLabel, points, auc };
}

/**
 * Trapezoidal AUC from sorted ROC points.
 */
function computeAUC(points: ROCPoint[]): number {
  let auc = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].fpr - points[i - 1].fpr;
    const avgY = (points[i].tpr + points[i - 1].tpr) / 2;
    auc += dx * avgY;
  }
  return auc;
}

/**
 * Calculate all classification metrics from predictions and actuals.
 *
 * @param predictions - predicted class labels
 * @param actuals - ground truth class labels
 * @param classScores - optional per-class probability scores for ROC curves
 *                      Map<classLabel, number[]> where each number[] is the
 *                      probability score per sample for that class
 */
export function calculateClassificationMetrics(
  predictions: string[],
  actuals: string[],
  classScores?: Map<string, number[]>,
): ClassificationMetrics {
  // Derive sorted unique labels
  const labelSet = new Set([...actuals, ...predictions]);
  const labels = Array.from(labelSet).sort();

  // Confusion matrix
  const confusionMatrix = buildConfusionMatrix(actuals, predictions, labels);

  // Per-class metrics
  const perClass = computePerClassMetrics(confusionMatrix, labels);

  // Overall accuracy
  const totalSamples = actuals.length;
  let correctPredictions = 0;
  for (let i = 0; i < totalSamples; i++) {
    if (actuals[i] === predictions[i]) correctPredictions++;
  }
  const accuracy = totalSamples > 0 ? correctPredictions / totalSamples : 0;

  // Macro averages (unweighted mean across classes)
  const macroPrecision =
    perClass.reduce((s, c) => s + c.precision, 0) / perClass.length;
  const macroRecall =
    perClass.reduce((s, c) => s + c.recall, 0) / perClass.length;
  const macroF1 = perClass.reduce((s, c) => s + c.f1Score, 0) / perClass.length;

  // Weighted averages (weighted by support)
  const weightedPrecision =
    perClass.reduce((s, c) => s + c.precision * c.support, 0) / totalSamples;
  const weightedRecall =
    perClass.reduce((s, c) => s + c.recall * c.support, 0) / totalSamples;
  const weightedF1 =
    perClass.reduce((s, c) => s + c.f1Score * c.support, 0) / totalSamples;

  // ROC curves (one per class, one-vs-rest)
  const rocCurves: ClassROC[] = labels.map((label) =>
    computeClassROC(actuals, predictions, label, classScores?.get(label)),
  );

  return {
    confusionMatrix,
    labels,
    accuracy,
    totalSamples,
    correctPredictions,
    perClass,
    macroPrecision,
    macroRecall,
    macroF1,
    weightedPrecision,
    weightedRecall,
    weightedF1,
    rocCurves,
    predictions,
    actuals,
  };
}
