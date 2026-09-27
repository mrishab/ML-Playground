import Plot from "react-plotly.js";
import { useDensityHeatmap } from "./useDensityHeatmap";
import type { DensityHeatmapProps } from "./useDensityHeatmap";

type Props = DensityHeatmapProps & {
  height?: number;
};

export function DensityHeatmap({ x, y, xLabel, yLabel, height = 320 }: Props) {
  const { data, layout, config } = useDensityHeatmap({
    x,
    y,
    xLabel,
    yLabel,
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
