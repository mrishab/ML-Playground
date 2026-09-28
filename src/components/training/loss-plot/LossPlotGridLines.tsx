import type { PlotDimensions } from "./lossPlotScales";

interface LinesProps {
  dim: PlotDimensions;
  plotW: number;
  plotH: number;
}

export function LossPlotGridLines({ dim, plotW, plotH }: LinesProps) {
  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const xTicks = [0, 0.33, 0.66, 1];

  return (
    <>
      {yTicks.map((pct) => (
        <line
          key={pct}
          x1={dim.padLeft}
          x2={dim.padLeft + plotW}
          y1={dim.padTop + (1 - pct) * plotH}
          y2={dim.padTop + (1 - pct) * plotH}
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeDasharray="3 3"
        />
      ))}
      {xTicks.map((pct) => (
        <line
          key={pct}
          x1={dim.padLeft + pct * plotW}
          x2={dim.padLeft + pct * plotW}
          y1={dim.padTop}
          y2={dim.padTop + plotH}
          stroke="currentColor"
          strokeOpacity={0.08}
        />
      ))}
    </>
  );
}
