import type { Layout } from "plotly.js";
import { getBasePlotLayout } from "../commonChartOptions";

export function getDensityHeatmapLayout(
  xLabel: string,
  yLabel: string,
  isDark: boolean,
): Partial<Layout> {
  return {
    ...getBasePlotLayout(isDark),
    xaxis: {
      title: { text: xLabel },
      gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
    },
    yaxis: {
      title: { text: yLabel },
      gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
    },
    margin: { t: 30, r: 20, b: 48, l: 48 },
  };
}
