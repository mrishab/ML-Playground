import type { ScaledPoint } from "./lossPlotScales";
import type { Palette } from "./lossPlotColors";

interface BoxProps {
  point: ScaledPoint;
  palette: Palette;
  tipX: number;
  tipY: number;
  shortMetric: string;
}

export function LossPlotTooltipBox({
  point,
  palette,
  tipX,
  tipY,
  shortMetric,
}: BoxProps) {
  const h = point.valLoss !== undefined ? 50 : 36;
  return (
    <g transform={`translate(${tipX}, ${tipY})`}>
      <rect
        width={110}
        height={h}
        rx={6}
        className="fill-popover stroke-border"
        strokeWidth={1}
      />
      <text x={8} y={14} className="fill-muted-foreground text-[10px]">
        Step {point.step}
      </text>
      <text
        x={8}
        y={28}
        className="text-[11px] font-semibold font-mono"
        fill={palette.primary}
      >
        {shortMetric}: {point.loss.toFixed(4)}
      </text>
      {point.valLoss !== undefined && (
        <text x={8} y={42} className="text-[10px] font-mono" fill={palette.val}>
          Val: {point.valLoss.toFixed(4)}
        </text>
      )}
    </g>
  );
}
