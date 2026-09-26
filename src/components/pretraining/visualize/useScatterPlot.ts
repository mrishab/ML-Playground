import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data } from "plotly.js";
import {
  useScatterPlotLayout,
  SCATTER_PLOT_CONFIG,
} from "./scatterPlotOptions";

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
        marker: { color: "#f59e0b", size: 8, opacity: 0.75 },
        hovertemplate: `${xLabel}: %{x:.4f}<br>${yLabel}: %{y:.4f}<extra></extra>`,
      },
    ],
    [x, y, xLabel, yLabel],
  );

  const layout = useScatterPlotLayout(xLabel, yLabel, isDark);

  return { data, layout, config: SCATTER_PLOT_CONFIG };
}
