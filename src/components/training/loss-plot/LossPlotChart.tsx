import Plot from "react-plotly.js";
import { useTheme } from "next-themes";
import type { LossTelemetry } from "@/types/loss";
import { useLossPlotLayout } from "./useLossPlotLayout";
import { useLossPlotTraces } from "./useLossPlotTraces";

const PLOT_CONFIG: Partial<Plotly.Config> = {
  displayModeBar: false,
  responsive: true,
};

export function LossPlotChart({ telemetry }: { telemetry: LossTelemetry }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const traces = useLossPlotTraces(telemetry);
  const layout = useLossPlotLayout(telemetry, isDark);

  return (
    <div className="w-full">
      <Plot
        data={traces}
        layout={layout}
        config={PLOT_CONFIG}
        useResizeHandler
        className="w-full"
      />
    </div>
  );
}
