import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data, Layout } from "plotly.js";
import { COMMON_PLOT_CONFIG } from "../commonChartOptions";
import { buildTargetCorrelationLayout } from "./targetCorrelationLayout";
import type { FeatureRankItem } from "./useOverviewData";

export function useTargetCorrelationPlot(
  rankings: FeatureRankItem[],
  targetColumn: string,
) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const reversed = useMemo(() => [...rankings].reverse(), [rankings]);

  const data: Data[] = useMemo(() => {
    const y = reversed.map((r) => r.feature);
    const x = reversed.map((r) => r.r);
    const colors = reversed.map((r) =>
      r.r >= 0
        ? isDark
          ? "#4fc1ff"
          : "#0284c7"
        : isDark
          ? "#f87171"
          : "#e11d48",
    );

    return [
      {
        type: "bar",
        orientation: "h",
        x,
        y,
        marker: { color: colors },
        hovertemplate: `Feature: %{y}<br>Correlation with ${targetColumn}: %{x:.3f}<extra></extra>`,
      },
    ];
  }, [reversed, targetColumn, isDark]);

  const layout: Partial<Layout> = useMemo(
    () => buildTargetCorrelationLayout(targetColumn, isDark),
    [targetColumn, isDark],
  );

  return { data, layout, config: COMMON_PLOT_CONFIG };
}
