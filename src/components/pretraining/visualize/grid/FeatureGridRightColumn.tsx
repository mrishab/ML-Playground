import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DistributionPlot } from "../DistributionPlot";
import { FeatureStatsTable } from "../FeatureStatsTable";
import type { BivariateAnalysis } from "@/lib/bivariate";

interface Props {
  x: number[];
  y: (number | string)[];
  featureName: string;
  targetColumn: string;
  problemType?: string;
  analysis: BivariateAnalysis;
}

export function FeatureGridRightColumn({
  x,
  y,
  featureName,
  targetColumn,
  problemType,
  analysis,
}: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Distribution & Box Plot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DistributionPlot
            x={x}
            y={y}
            xLabel={featureName}
            yLabel={targetColumn}
            problemType={problemType}
            height={300}
          />
        </CardContent>
      </Card>
      <FeatureStatsTable analysis={analysis} />
    </div>
  );
}
