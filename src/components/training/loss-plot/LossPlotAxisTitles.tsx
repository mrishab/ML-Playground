interface AxisTitlesProps {
  centerX: number;
  bottomY: number;
  centerY: number;
  shortMetric: string;
}

export function LossPlotAxisTitles({
  centerX,
  bottomY,
  centerY,
  shortMetric,
}: AxisTitlesProps) {
  return (
    <>
      <text
        x={centerX}
        y={bottomY}
        textAnchor="middle"
        className="text-[11px] font-medium"
      >
        Iteration / Step
      </text>
      <text
        x={12}
        y={centerY}
        textAnchor="middle"
        transform={`rotate(-90, 12, ${centerY})`}
        className="text-[11px] font-medium"
      >
        {shortMetric}
      </text>
    </>
  );
}
