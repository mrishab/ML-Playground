interface YLabelsProps {
  padLeft: number;
  padTop: number;
  plotH: number;
  minLoss: number;
  maxLoss: number;
  yTicks: number[];
}

function formatTickValue(val: number): string {
  if (Math.abs(val) < 1e-6) return "0";
  if (Math.abs(val) >= 1000) {
    return Math.round(val).toLocaleString();
  }
  if (Math.abs(val) >= 10) {
    return val.toFixed(1);
  }
  if (Math.abs(val) >= 1) {
    return val.toFixed(2);
  }
  return val.toFixed(3);
}

export function LossPlotYLabels({
  padLeft,
  padTop,
  plotH,
  minLoss,
  maxLoss,
  yTicks,
}: YLabelsProps) {
  return (
    <>
      {yTicks.map((pct) => (
        <text
          key={pct}
          x={padLeft - 6}
          y={padTop + (1 - pct) * plotH + 3}
          textAnchor="end"
        >
          {formatTickValue(minLoss + pct * (maxLoss - minLoss))}
        </text>
      ))}
    </>
  );
}
