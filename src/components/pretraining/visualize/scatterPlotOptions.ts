import { useMemo } from "react";
import type { Layout, Config } from "plotly.js";

export function useScatterPlotLayout(
  xLabel: string,
  yLabel: string,
  isDark: boolean,
): Partial<Layout> {
  return useMemo(
    () => ({
      xaxis: {
        title: { text: xLabel },
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      yaxis: {
        title: { text: yLabel },
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      margin: { t: 30, r: 16, b: 48, l: 48 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { family: "inherit", color: isDark ? "#d4d4d4" : "#334155" },
      hoverlabel: {
        bgcolor: isDark ? "#252526" : "#ffffff",
        font: { family: "inherit", color: isDark ? "#d4d4d4" : "#0f172a" },
        bordercolor: isDark ? "#383838" : "#e2e8f0",
      },
      hovermode: "closest",
    }),
    [xLabel, yLabel, isDark],
  );
}

export const SCATTER_PLOT_CONFIG: Partial<Config> = {
  displayModeBar: true,
  displaylogo: false,
  modeBarButtonsToRemove: [
    "select2d",
    "lasso2d",
    "autoScale2d",
    "toggleSpikelines",
  ],
  responsive: true,
};
