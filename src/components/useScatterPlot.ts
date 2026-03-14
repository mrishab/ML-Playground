import { useMemo } from "react";
import type { Data, Layout, Config } from "plotly.js";

export type ScatterPlotData = {
  x: number[];
  y: number[];
  xLabel: string;
  yLabel: string;
};

export function useScatterPlot({ x, y, xLabel, yLabel }: ScatterPlotData) {
  const data: Data[] = useMemo(
    () => [
      {
        x,
        y,
        type: "scatter",
        mode: "markers",
        marker: {
          color: "hsl(var(--primary))",
          size: 8,
          opacity: 0.7,
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
        gridcolor: "hsl(var(--border))",
        zerolinecolor: "hsl(var(--border))",
      },
      yaxis: {
        title: { text: yLabel },
        gridcolor: "hsl(var(--border))",
        zerolinecolor: "hsl(var(--border))",
      },
      margin: { t: 40, r: 40, b: 60, l: 60 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: {
        family: "inherit",
        color: "hsl(var(--foreground))",
      },
      hovermode: "closest",
    }),
    [xLabel, yLabel],
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
