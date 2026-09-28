import type { PlotDimensions } from "./lossPlotScales";
import { LossPlotGridLines } from "./LossPlotGridLines";
import { LossPlotYLabels } from "./LossPlotYLabels";
import { LossPlotAxisTitles } from "./LossPlotAxisTitles";

interface GridProps {
  dim: PlotDimensions;
  minLoss: number;
  maxLoss: number;
  maxStep: number;
  shortMetric: string;
}

export function LossPlotGrid({
  dim,
  minLoss,
  maxLoss,
  maxStep,
  shortMetric,
}: GridProps) {
  const plotW = dim.width - dim.padLeft - dim.padRight;
  const plotH = dim.height - dim.padTop - dim.padBottom;
  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const xTicks = [0, 0.33, 0.66, 1];

  return (
    <g className="text-[10px] fill-muted-foreground select-none">
      <LossPlotGridLines dim={dim} plotW={plotW} plotH={plotH} />
      <LossPlotYLabels
        padLeft={dim.padLeft}
        padTop={dim.padTop}
        plotH={plotH}
        minLoss={minLoss}
        maxLoss={maxLoss}
        yTicks={yTicks}
      />
      {xTicks.map((pct) => (
        <text
          key={pct}
          x={dim.padLeft + pct * plotW}
          y={dim.padTop + plotH + 16}
          textAnchor="middle"
        >
          {Math.round(1 + pct * (maxStep - 1))}
        </text>
      ))}
      <LossPlotAxisTitles
        centerX={dim.padLeft + plotW / 2}
        bottomY={dim.height - 4}
        centerY={dim.padTop + plotH / 2}
        shortMetric={shortMetric}
      />
    </g>
  );
}
