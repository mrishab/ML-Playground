import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ScatterPlot } from "../ScatterPlot";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
}

export function FocusedScatterView({
  x,
  y,
  featureName,
  targetColumn,
  problemType,
}: Props) {
  return (
    <TabsContent value="scatter">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Scatter Plot with OLS Fit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScatterPlot
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
