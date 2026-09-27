import Plot from "react-plotly.js";
import { useTargetCorrelationPlot } from "./useTargetCorrelationPlot";
import type { FeatureRankItem } from "./useOverviewData";

interface Props {
  rankings: FeatureRankItem[];
  targetColumn: string;
}

export function TargetCorrelationPlot({ rankings, targetColumn }: Props) {
  const { data, layout, config } = useTargetCorrelationPlot(
    rankings,
    targetColumn,
  );

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      useResizeHandler
      className="w-full"
    />
  );
}
