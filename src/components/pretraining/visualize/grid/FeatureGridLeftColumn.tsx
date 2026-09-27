import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterPlot } from "../ScatterPlot";
import { DensityHeatmap } from "../DensityHeatmap";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
}

export function FeatureGridLeftColumn({
  x,
  y,
  featureName,
  targetColumn,
  problemType,
}: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Scatter Plot & Trendline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScatterPlot
            x={x}
            y={y}
            xLabel={featureName}
            yLabel={targetColumn}
            problemType={problemType}
            height={300}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            2D Density Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DensityHeatmap
            x={x}
            y={y}
            xLabel={featureName}
            yLabel={targetColumn}
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
}
