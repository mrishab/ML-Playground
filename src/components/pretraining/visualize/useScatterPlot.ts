import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data, Layout, Config } from "plotly.js";

export type ScatterPlotData = {
  x: number[];
  y: number[];
  xLabel: string;
  yLabel: string;
};

export function useScatterPlot({ x, y, xLabel, yLabel }: ScatterPlotData) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data: Data[] = useMemo(
    () => [
      {
        x,
        y,
        type: "scatter",
        mode: "markers",
        marker: {
          color: "#f59e0b",
          size: 8,
          opacity: 0.75,
        },
        hovertemplate: `${xLabel}: %{x:.4f}<br>${yLabel}: %{y:.4f}<extra></extra>`,
      },
    ],
    [x, y, xLabel, yLabel],
  );

  const layout: Partial<Layout> = useMemo(
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
      margin: { t: 40, r: 40, b: 60, l: 60 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: {
        family: "inherit",
        color: isDark ? "#cbd5e1" : "#334155",
      },
      hovermode: "closest",
    }),
    [xLabel, yLabel, isDark],
  );

  const config: Partial<Config> = useMemo(
    () => ({
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: [
        "select2d",
        "lasso2d",
        "autoScale2d",
        "toggleSpikelines",
      ],
      responsive: true,
    }),
    [],
  );

  return { data, layout, config };
}
