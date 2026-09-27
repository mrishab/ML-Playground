import { useMemo } from "react";
import { formatNumber } from "@/lib/number";
import type { ClassROC } from "@/types/classification";
import { ROC_COLORS } from "./colors";

export function useRocTraces(
  rocCurves: ClassROC[],
  isDark: boolean,
): Plotly.Data[] {
  return useMemo(() => {
    const classTraces: Plotly.Data[] = rocCurves.map((curve, i) => ({
      x: curve.points.map((p) => p.fpr),
      y: curve.points.map((p) => p.tpr),
      type: "scatter" as const,
      mode: "lines" as const,
      name: `${curve.label} (AUC = ${formatNumber(curve.auc)})`,
      line: { color: ROC_COLORS[i % ROC_COLORS.length], width: 2 },
    }));

    classTraces.push({
      x: [0, 1],
      y: [0, 1],
      type: "scatter" as const,
      mode: "lines" as const,
      name: "Random (AUC = 0.5)",
      line: {
        color: isDark ? "#808080" : "#94a3b8",
        width: 1,
        dash: "dash",
      },
      showlegend: true,
    });

    return classTraces;
  }, [rocCurves, isDark]);
}
