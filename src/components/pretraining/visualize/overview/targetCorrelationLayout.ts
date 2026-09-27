import type { Layout } from "plotly.js";
import { getBasePlotLayout } from "../commonChartOptions";

export function buildTargetCorrelationLayout(
  targetColumn: string,
  isDark: boolean,
): Partial<Layout> {
  return {
    ...getBasePlotLayout(isDark),
    xaxis: {
      title: { text: `Pearson r vs ${targetColumn}` },
      range: [-1.05, 1.05],
      gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
      zerolinecolor: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
    },
    yaxis: { automargin: true },
    margin: { t: 20, r: 20, b: 50, l: 80 },
    height: 380,
    autosize: true,
  };
}
