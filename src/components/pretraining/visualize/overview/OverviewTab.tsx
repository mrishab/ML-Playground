import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CorrelationMatrixPlot } from "./CorrelationMatrixPlot";
import { TargetCorrelationPlot } from "./TargetCorrelationPlot";
import { FeatureSummaryTable } from "./FeatureSummaryTable";
import { useOverviewData } from "./useOverviewData";

interface Props {
  featureNames: string[];
  targetColumn: string;
  getFeatureData: (featureName: string) => { x: number[]; y: number[] };
}

export function OverviewTab(props: Props) {
  const { allColumns, corrMatrix, rankings } = useOverviewData(props);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Correlation Matrix Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CorrelationMatrixPlot columns={allColumns} matrix={corrMatrix} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Feature Correlation Ranking vs {props.targetColumn}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TargetCorrelationPlot
              rankings={rankings}
              targetColumn={props.targetColumn}
            />
          </CardContent>
        </Card>
      </div>
      <FeatureSummaryTable
        rankings={rankings}
        targetColumn={props.targetColumn}
      />
    </div>
  );
}
