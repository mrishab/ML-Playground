import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { DistributionPlot } from "../DistributionPlot";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
}

export function FocusedDistributionView({
  x,
  y,
  featureName,
  targetColumn,
  problemType,
}: Props) {
  return (
    <TabsContent value="distribution">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Distribution Spread & Outliers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DistributionPlot
            x={x}
            y={y}
            xLabel={featureName}
            yLabel={targetColumn}
            problemType={problemType}
            height={460}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
