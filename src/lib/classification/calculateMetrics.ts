import type { ClassificationMetrics, ClassROC } from "@/types/classification";
import { buildConfusionMatrix } from "./confusionMatrix";
import { computePerClassMetrics } from "./perClassMetrics";
import { computeClassROC } from "./classROC";

export function calculateClassificationMetrics(
  predictions: string[],
  actuals: string[],
  classScores?: Map<string, number[]>,
): ClassificationMetrics {
  const labelSet = new Set([...actuals, ...predictions]);
  const labels = Array.from(labelSet).sort();

  const confusionMatrix = buildConfusionMatrix(actuals, predictions, labels);
  const perClass = computePerClassMetrics(confusionMatrix, labels);

  const totalSamples = actuals.length;
  let correctPredictions = 0;
  for (let i = 0; i < totalSamples; i++) {
    if (actuals[i] === predictions[i]) correctPredictions++;
  }
  const accuracy = totalSamples > 0 ? correctPredictions / totalSamples : 0;

  const macroPrecision =
    perClass.reduce((s, c) => s + c.precision, 0) / perClass.length;
  const macroRecall =
    perClass.reduce((s, c) => s + c.recall, 0) / perClass.length;
  const macroF1 = perClass.reduce((s, c) => s + c.f1Score, 0) / perClass.length;

  const weightedPrecision =
    perClass.reduce((s, c) => s + c.precision * c.support, 0) / totalSamples;
  const weightedRecall =
    perClass.reduce((s, c) => s + c.recall * c.support, 0) / totalSamples;
  const weightedF1 =
    perClass.reduce((s, c) => s + c.f1Score * c.support, 0) / totalSamples;

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
