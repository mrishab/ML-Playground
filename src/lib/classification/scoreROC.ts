import type { ClassROC, ROCPoint } from "@/types/classification";
import { computeAUC } from "./auc";

export function computeScoreROC(
  actuals: string[],
  targetLabel: string,
  scores: number[],
): ClassROC {
  const binaryActual = actuals.map((a) => (a === targetLabel ? 1 : 0));
  const indexed = binaryActual.map((label, i) => ({ label, score: scores[i] }));
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

    const last = points[points.length - 1];
    if (fpr !== last.fpr || tpr !== last.tpr) {
      points.push({ fpr, tpr, threshold: indexed[i].score });
    }
  }

  const last = points[points.length - 1];
  if (last.fpr !== 1 || last.tpr !== 1) {
    points.push({ fpr: 1, tpr: 1, threshold: -Infinity });
  }

  return { label: targetLabel, points, auc: computeAUC(points) };
}
