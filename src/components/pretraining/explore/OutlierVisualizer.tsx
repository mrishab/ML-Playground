import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoxPlotOptions } from "./outlier/useBoxPlotOptions";
import { OutlierIQRSlider } from "./outlier/OutlierIQRSlider";
import { OutlierFooter } from "./outlier/OutlierFooter";
import type { OutlierVisualizerProps } from "./outlier/types";

export type { OutlierVisualizerProps };

export function OutlierVisualizer(props: OutlierVisualizerProps) {
  const { data, layout, config } = useBoxPlotOptions(props.numericColumnData);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Outliers (IQR Boxplot)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <OutlierIQRSlider
          iqrMultiplier={props.iqrMultiplier}
          setIqrMultiplier={props.setIqrMultiplier}
        />
        <Plot
          data={data}
          layout={{ ...layout, height: 320, autosize: true }}
          config={config}
          useResizeHandler
          className="w-full"
        />
        <OutlierFooter
          totalOutliers={props.totalOutlierValues}
          rowsAffected={props.removedRowsAfterOutlierDrop}
          onDrop={props.dropOutliers}
        />
      </CardContent>
    </Card>
  );
}
