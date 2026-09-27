import Plot from "react-plotly.js";
import { COMMON_PLOT_CONFIG } from "../commonChartOptions";
import { useCorrelationMatrixPlot } from "./useCorrelationMatrixPlot";

interface Props {
  columns: string[];
  matrix: number[][];
}

export function CorrelationMatrixPlot({ columns, matrix }: Props) {
  const { data, layout } = useCorrelationMatrixPlot({ columns, matrix });

  return (
    <Plot
      data={data}
      layout={layout}
      config={COMMON_PLOT_CONFIG}
      useResizeHandler
      className="w-full"
    />
  );
}
