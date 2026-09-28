import type { ScaledPoint } from "./lossPlotScales";
import type { Palette } from "./lossPlotColors";
import { LossPlotTooltipBox } from "./LossPlotTooltipBox";

interface TooltipProps {
  point: ScaledPoint;
  palette: Palette;
  dimHeight: number;
  shortMetric: string;
}

export function LossPlotTooltip({
  point,
  palette,
  dimHeight,
  shortMetric,
}: TooltipProps) {
  const isRight = point.x > 320;
  const tipX = isRight ? point.x - 120 : point.x + 12;
  const tipY = Math.max(30, Math.min(dimHeight - 80, point.y - 30));

  return (
    <g className="pointer-events-none transition-opacity duration-150 ease-out">
      <line
        x1={point.x}
        x2={point.x}
        y1={16}
        y2={dimHeight - 36}
        stroke="currentColor"
        strokeOpacity={0.25}
        strokeDasharray="2 2"
      />
      <circle cx={point.x} cy={point.y} r={5} fill={palette.primary} />
      <LossPlotTooltipBox
        point={point}
        palette={palette}
        tipX={tipX}
        tipY={tipY}
        shortMetric={shortMetric}
      />
    </g>
  );
}
