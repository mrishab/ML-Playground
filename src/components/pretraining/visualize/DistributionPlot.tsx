import Plot from "react-plotly.js";
import { useDistributionPlot } from "./useDistributionPlot";
import type { DistributionPlotProps } from "./useDistributionPlot";

type Props = DistributionPlotProps & {
  height?: number;
};

export function DistributionPlot({
  x,
  y,
  xLabel,
  yLabel,
  problemType,
  height = 320,
}: Props) {
  const { data, layout, config } = useDistributionPlot({
    x,
    y,
    xLabel,
    yLabel,
    problemType,
  });

  return (
    <Plot
      data={data}
      layout={{ ...layout, height, autosize: true }}
      config={config}
      useResizeHandler
      className="w-full"
    />
  );
}
