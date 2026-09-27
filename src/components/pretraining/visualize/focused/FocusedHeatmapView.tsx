import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { DensityHeatmap } from "../DensityHeatmap";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
}

export function FocusedHeatmapView({ x, y, featureName, targetColumn }: Props) {
  return (
    <TabsContent value="heatmap">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            2D Density Joint Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DensityHeatmap
            x={x}
            y={y}
            xLabel={featureName}
            yLabel={targetColumn}
            height={460}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
