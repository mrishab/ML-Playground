import { useMemo } from "react";
import type { Data } from "plotly.js";
import type { LossTelemetry } from "@/types/loss";
import { COLOR_PALETTES } from "./lossPlotColors";

export function useLossPlotTraces(telemetry: LossTelemetry): Data[] {
  return useMemo(() => {
    const palette = COLOR_PALETTES[telemetry.kind];
    const steps = telemetry.history.map((h) => h.step);
    const losses = telemetry.history.map((h) => h.loss);

    const primaryTrace: Data = {
      x: steps,
      y: losses,
      name: `${telemetry.shortMetric} (Train)`,
      type: "scatter",
      mode: "lines+markers",
      line: { color: palette.primary, width: 2.5 },
      marker: { size: 5, color: palette.primary },
      fill: "tozeroy",
      fillcolor: palette.fill,
    };

    const traces: Data[] = [primaryTrace];

    const hasValLoss = telemetry.history.some((h) => h.valLoss !== undefined);
    if (hasValLoss) {
      traces.push({
        x: steps,
        y: telemetry.history.map((h) => h.valLoss ?? null),
        name: `${telemetry.shortMetric} (Validation)`,
        type: "scatter",
        mode: "lines",
        line: { color: palette.val, width: 2, dash: "dash" },
      });
    }

    if (telemetry.secondaryName) {
      traces.push({
        x: steps,
        y: telemetry.history.map((h) => h.secondary ?? null),
        name: telemetry.secondaryName,
        type: "scatter",
        mode: "lines",
        yaxis: "y2",
        line: { color: palette.secondary, width: 2, dash: "dot" },
      });
    }

    return traces;
  }, [telemetry]);
}
