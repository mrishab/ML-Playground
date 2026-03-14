import Plot from "react-plotly.js";
import { useScatterPlot } from "./useScatterPlot";
import type { ScatterPlotData } from "./useScatterPlot";

type ScatterPlotProps = ScatterPlotData & {
  height?: number;
};

export function ScatterPlot({
  x,
  y,
  xLabel,
  yLabel,
  height = 400,
}: ScatterPlotProps) {
  const { data, layout, config } = useScatterPlot({ x, y, xLabel, yLabel });

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
