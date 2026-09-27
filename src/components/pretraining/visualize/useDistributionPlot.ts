import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Data, Layout } from "plotly.js";
import { getBasePlotLayout, COMMON_PLOT_CONFIG } from "./commonChartOptions";
import { buildDistributionTraces } from "./distribution/distributionTraces";

export interface DistributionPlotProps {
  x: number[];
  y: (number | string)[];
  xLabel: string;
  yLabel: string;
  problemType?: string;
}

export function useDistributionPlot({
  x,
  y,
  xLabel,
  yLabel,
  problemType,
}: DistributionPlotProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data: Data[] = useMemo(
    () => buildDistributionTraces(x, y, problemType),
    [x, y, problemType],
  );

  const layout: Partial<Layout> = useMemo(
    () => ({
      ...getBasePlotLayout(isDark),
      xaxis: {
        title: {
          text:
            problemType === "classification"
              ? yLabel
              : `${xLabel} (Quartile Bins)`,
        },
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
      },
      yaxis: {
        title: {
          text: problemType === "classification" ? xLabel : yLabel,
        },
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
      },
      margin: { t: 30, r: 20, b: 60, l: 48 },
    }),
    [xLabel, yLabel, problemType, isDark],
  );

  return { data, layout, config: COMMON_PLOT_CONFIG };
}
