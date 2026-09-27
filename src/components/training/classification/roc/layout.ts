import { useMemo } from "react";

export function useRocLayout(isDark: boolean): Partial<Plotly.Layout> {
  return useMemo(
    () => ({
      xaxis: {
        title: { text: "False Positive Rate (FPR)" },
        range: [0, 1],
        dtick: 0.2,
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      yaxis: {
        title: { text: "True Positive Rate (TPR)" },
        range: [0, 1.05],
        dtick: 0.2,
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      legend: { x: 0.4, y: 0.05, bgcolor: "rgba(0,0,0,0)" },
      margin: { t: 20, r: 16, b: 50, l: 48 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: isDark ? "#d4d4d4" : "#334155" },
      hoverlabel: {
        bgcolor: isDark ? "#252526" : "#ffffff",
        font: { family: "inherit", color: isDark ? "#d4d4d4" : "#0f172a" },
        bordercolor: isDark ? "#383838" : "#e2e8f0",
      },
      height: 320,
      autosize: true,
    }),
    [isDark],
  );
}

export const ROC_CONFIG: Partial<Plotly.Config> = {
  displayModeBar: false,
  responsive: true,
};
