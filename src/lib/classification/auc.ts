import type { ROCPoint } from "@/types/classification";

/**
 * Trapezoidal AUC from sorted ROC points.
 */
export function computeAUC(points: ROCPoint[]): number {
  let auc = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].fpr - points[i - 1].fpr;
    const avgY = (points[i].tpr + points[i - 1].tpr) / 2;
    auc += dx * avgY;
  }
  return auc;
}
