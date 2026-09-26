import type { ClassROC } from "@/types/classification";
import { computeHardPredictionROC } from "./hardPredictionROC";
import { computeScoreROC } from "./scoreROC";

export function computeClassROC(
  actuals: string[],
  predictions: string[],
  targetLabel: string,
  scores?: number[],
): ClassROC {
  if (!scores) {
    return computeHardPredictionROC(actuals, predictions, targetLabel);
  }
  return computeScoreROC(actuals, targetLabel, scores);
}
