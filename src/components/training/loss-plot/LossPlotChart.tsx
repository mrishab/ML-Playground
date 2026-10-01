import { useId } from "react";
import type { LossTelemetry } from "@/types/loss";
import { COLOR_PALETTES } from "./lossPlotColors";
import { buildLossPaths } from "./lossPlotPathBuilder";
import { useLossPlotHover } from "./useLossPlotHover";
import { LossPlotGrid } from "./LossPlotGrid";
import { LossPlotTraces } from "./LossPlotTraces";
import { LossPlotLegend } from "./LossPlotLegend";
import { LossPlotTooltip } from "./LossPlotTooltip";
import { DEFAULT_DIM } from "./lossPlotScales";

export function LossPlotChart({ telemetry }: { telemetry: LossTelemetry }) {
  const rawId = useId();
  const gradId = `loss-grad-${rawId.replace(/:/g, "")}`;
  const palette = COLOR_PALETTES[telemetry.kind];
  const paths = buildLossPaths(telemetry.history, telemetry.totalSteps, DEFAULT_DIM);
  const hover = useLossPlotHover(paths.points, DEFAULT_DIM.width);

  return (
    <div className="w-full space-y-2">
      <svg
        viewBox={`0 0 ${DEFAULT_DIM.width} ${DEFAULT_DIM.height}`}
        className="w-full h-auto overflow-visible cursor-crosshair"
        onMouseMove={hover.handleMouseMove}
        onMouseLeave={hover.handleMouseLeave}
      >
        <LossPlotTraces
          gradId={gradId}
          palette={palette}
          areaPath={paths.areaPath}
          linePath={paths.linePath}
          valLinePath={paths.valLinePath}
          lastPoint={paths.points[paths.points.length - 1]}
        />
        <LossPlotGrid
          dim={DEFAULT_DIM}
          minLoss={paths.minLoss}
          maxLoss={paths.maxLoss}
          maxStep={paths.maxStep}
          shortMetric={telemetry.shortMetric}
        />
        {hover.hovered && (
          <LossPlotTooltip
            point={hover.hovered}
            palette={palette}
            dimHeight={DEFAULT_DIM.height}
            shortMetric={telemetry.shortMetric}
          />
        )}
      </svg>
      <LossPlotLegend
        palette={palette}
        shortMetric={telemetry.shortMetric}
        hasVal={Boolean(paths.valLinePath)}
        secondaryName={telemetry.secondaryName}
      />
    </div>
  );
}
