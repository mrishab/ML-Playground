import type { Palette } from "./lossPlotColors";

interface LegendProps {
  palette: Palette;
  shortMetric: string;
  hasVal: boolean;
  secondaryName?: string;
}

export function LossPlotLegend({
  palette,
  shortMetric,
  hasVal,
  secondaryName,
}: LegendProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs text-muted-foreground select-none">
      <div className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-5 rounded-sm"
          style={{ backgroundColor: palette.primary }}
        />
        <span>{shortMetric} (Train)</span>
      </div>
      {hasVal && (
        <div className="flex items-center gap-1.5">
          <span
            className="h-0.5 w-5 border-t-2 border-dashed"
            style={{ borderColor: palette.val }}
          />
          <span>{shortMetric} (Validation)</span>
        </div>
      )}
      {secondaryName && (
        <div className="flex items-center gap-1.5">
          <span
            className="h-0.5 w-5 border-t-2 border-dotted"
            style={{ borderColor: palette.secondary }}
          />
          <span>{secondaryName}</span>
        </div>
      )}
    </div>
  );
}
