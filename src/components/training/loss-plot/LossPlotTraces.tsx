import type { Palette } from "./lossPlotColors";
import type { ScaledPoint } from "./lossPlotScales";

interface TracesProps {
  gradId: string;
  palette: Palette;
  areaPath: string;
  linePath: string;
  valLinePath: string | null;
  lastPoint?: ScaledPoint;
}

export function LossPlotTraces({ gradId, palette, areaPath, linePath, valLinePath, lastPoint }: TracesProps) {
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.primary} stopOpacity={0.25} />
          <stop offset="100%" stopColor={palette.primary} stopOpacity={0.0} />
        </linearGradient>
      </defs>
      {areaPath && <path d={areaPath} fill={`url(#${gradId})`} />}
      {linePath && (
        <path d={linePath} fill="none" stroke={palette.primary} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      )}
      {valLinePath && (
        <path d={valLinePath} fill="none" stroke={palette.val} strokeWidth={1.8} strokeDasharray="4 4" />
      )}
      {lastPoint && (
        <g>
          <circle cx={lastPoint.x} cy={lastPoint.y} r={6} fill={palette.primary} fillOpacity={0.25} />
          <circle cx={lastPoint.x} cy={lastPoint.y} r={3.5} fill={palette.primary} />
        </g>
      )}
    </>
  );
}
