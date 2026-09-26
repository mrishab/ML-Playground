import type { ClassROC, ROCPoint } from "@/types/classification";
import { computeAUC } from "./auc";

export function computeHardPredictionROC(
  actuals: string[],
  predictions: string[],
  targetLabel: string,
): ClassROC {
  let tp = 0;
  let fp = 0;
  let fn = 0;
  let tn = 0;

  for (let i = 0; i < actuals.length; i++) {
    const isAct = actuals[i] === targetLabel;
    const isPred = predictions[i] === targetLabel;
    if (isAct && isPred) tp++;
    else if (!isAct && isPred) fp++;
    else if (isAct && !isPred) fn++;
    else tn++;
  }

  const tpr = tp + fn > 0 ? tp / (tp + fn) : 0;
  const fpr = fp + tn > 0 ? fp / (fp + tn) : 0;

  const points: ROCPoint[] = [
    { fpr: 0, tpr: 0, threshold: Infinity },
    { fpr, tpr, threshold: 0.5 },
    { fpr: 1, tpr: 1, threshold: -Infinity },
  ];

  return { label: targetLabel, points, auc: computeAUC(points) };
}
