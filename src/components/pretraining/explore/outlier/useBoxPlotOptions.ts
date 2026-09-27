import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Config, Data, Layout } from "plotly.js";
import type { NumericColumnData } from "./types";

const BOX_CONFIG: Partial<Config> = {
  displaylogo: false,
  responsive: true,
  modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"],
};

export function useBoxPlotOptions(numericColumnData: NumericColumnData[]) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data: Data[] = useMemo(
    () =>
      numericColumnData.map((col) => ({
        type: "box",
        name: col.column,
        y: col.values,
        boxpoints: "outliers",
        marker: { size: 4, color: isDark ? "#4fc1ff" : "#0284c7" },
        line: { color: isDark ? "#4fc1ff" : "#0284c7", width: 1.5 },
        fillcolor: isDark ? "rgba(79,193,255,0.15)" : "rgba(2,132,199,0.12)",
      })),
    [numericColumnData, isDark],
  );

  const layout: Partial<Layout> = useMemo(
    () => ({
      margin: { t: 20, r: 10, b: 80, l: 40 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { family: "inherit", color: isDark ? "#d4d4d4" : "#334155" },
      hoverlabel: {
        bgcolor: isDark ? "#252526" : "#ffffff",
        font: { family: "inherit", color: isDark ? "#d4d4d4" : "#0f172a" },
        bordercolor: isDark ? "#383838" : "#e2e8f0",
      },
      xaxis: {
        tickangle: -30,
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      yaxis: {
        title: { text: "Value" },
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      showlegend: false,
    }),
    [isDark],
  );

  return { data, layout, config: BOX_CONFIG };
}
