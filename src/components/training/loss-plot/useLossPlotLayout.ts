import { useMemo } from "react";
import type { LossTelemetry } from "@/types/loss";

export function useLossPlotLayout(
  telemetry: LossTelemetry,
  isDark: boolean,
): Partial<Plotly.Layout> {
  const hasSecondary = Boolean(telemetry.secondaryName);

  return useMemo(() => {
    const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    const textColor = isDark ? "#d4d4d4" : "#475569";

    const baseLayout: Partial<Plotly.Layout> = {
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: textColor, family: "inherit", size: 12 },
      margin: { t: 24, r: hasSecondary ? 54 : 20, b: 44, l: 54 },
      height: 280,
      autosize: true,
      showlegend: true,
      legend: { orientation: "h", y: -0.22, x: 0.5, xanchor: "center" },
      xaxis: {
        title: { text: "Iteration / Epoch", font: { size: 11 } },
        gridcolor: gridColor,
        zerolinecolor: gridColor,
      },
      yaxis: {
        title: { text: telemetry.shortMetric, font: { size: 11 } },
        gridcolor: gridColor,
        zerolinecolor: gridColor,
      },
    };

    if (hasSecondary) {
      baseLayout.yaxis2 = {
        title: { text: telemetry.secondaryName, font: { size: 11 } },
        overlaying: "y",
        side: "right",
        showgrid: false,
      };
    }

    return baseLayout;
  }, [telemetry.secondaryName, telemetry.shortMetric, isDark, hasSecondary]);
}
