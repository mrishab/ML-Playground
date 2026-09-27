import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data, Layout } from "plotly.js";
import { getBasePlotLayout } from "../commonChartOptions";

interface Params {
  columns: string[];
  matrix: number[][];
}

export function useCorrelationMatrixPlot({ columns, matrix }: Params) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data: Data[] = useMemo(
    () => [
      {
        z: matrix,
        x: columns,
        y: columns,
        type: "heatmap",
        colorscale: isDark ? "RdBu" : "RdBu",
        reversescale: true,
        zmin: -1,
        zmax: 1,
        colorbar: {
          title: { text: "Pearson r", side: "right" },
          thickness: 10,
          len: 0.85,
          tickfont: { color: isDark ? "#d4d4d4" : "#334155", size: 10 },
        },
        hovertemplate: "%{x} & %{y}<br>r: %{z:.3f}<extra></extra>",
      },
    ],
    [matrix, columns, isDark],
  );

  const layout: Partial<Layout> = useMemo(
    () => ({
      ...getBasePlotLayout(isDark),
      xaxis: { tickangle: -45 },
      yaxis: { autorange: "reversed" },
      margin: { t: 20, r: 20, b: 80, l: 80 },
      height: 380,
      autosize: true,
    }),
    [isDark],
  );

  return { data, layout };
}
