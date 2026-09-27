import type { Layout, Config } from "plotly.js";

export function getBasePlotLayout(isDark: boolean): Partial<Layout> {
  return {
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { family: "inherit", color: isDark ? "#d4d4d4" : "#334155" },
    hoverlabel: {
      bgcolor: isDark ? "#252526" : "#ffffff",
      font: { family: "inherit", color: isDark ? "#d4d4d4" : "#0f172a" },
      bordercolor: isDark ? "#383838" : "#e2e8f0",
    },
  };
}

export const COMMON_PLOT_CONFIG: Partial<Config> = {
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
