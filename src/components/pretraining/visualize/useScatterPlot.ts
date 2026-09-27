import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data } from "plotly.js";
import {
  useScatterPlotLayout,
  SCATTER_PLOT_CONFIG,
} from "./scatterPlotOptions";
import { buildScatterTraces } from "./scatter/scatterTraces";

export type ScatterPlotData = {
  x: number[];
  y: (number | string)[];
  xLabel: string;
  yLabel: string;
  problemType?: string;
};

export function useScatterPlot({
  x,
  y,
  xLabel,
  yLabel,
  problemType,
}: ScatterPlotData) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data: Data[] = useMemo(
    () => buildScatterTraces(x, y, xLabel, yLabel, problemType, isDark),
    [x, y, xLabel, yLabel, problemType, isDark],
  );

  const layout = useScatterPlotLayout(xLabel, yLabel, isDark);
  return { data, layout, config: SCATTER_PLOT_CONFIG };
}
