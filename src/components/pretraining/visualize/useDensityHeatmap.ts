import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data } from "plotly.js";
import { COMMON_PLOT_CONFIG } from "./commonChartOptions";
import { getDensityHeatmapLayout } from "./density/densityHeatmapLayout";

export interface DensityHeatmapProps {
  x: number[];
  y: (number | string)[];
  xLabel: string;
  yLabel: string;
}

export function useDensityHeatmap({
  x,
  y,
  xLabel,
  yLabel,
}: DensityHeatmapProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const numY = useMemo(() => y.map(Number), [y]);

  const data: Data[] = useMemo(
    () => [
      {
        x,
        y: numY,
        type: "histogram2d",
        colorscale: isDark ? "Viridis" : "YlOrRd",
        reversescale: false,
        colorbar: {
          title: { text: "Density", side: "right" },
          thickness: 10,
          len: 0.8,
          tickfont: { color: isDark ? "#d4d4d4" : "#334155", size: 10 },
        },
        hovertemplate: `${xLabel}: %{x:.2f}<br>${yLabel}: %{y:.2f}<br>Count: %{z}<extra></extra>`,
      },
    ],
    [x, numY, xLabel, yLabel, isDark],
  );

  const layout = useMemo(
    () => getDensityHeatmapLayout(xLabel, yLabel, isDark),
    [xLabel, yLabel, isDark],
  );

  return { data, layout, config: COMMON_PLOT_CONFIG };
}
