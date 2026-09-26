import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EvaluatedModel } from "./types";
import { ModelMetricBox } from "./ModelMetricBox";

interface BestModelBannerProps {
  bestModel: EvaluatedModel;
  testCount?: number;
  featureCount: number;
  targetColumn: string;
}

export function BestModelBanner({
  bestModel,
  testCount,
  featureCount,
  targetColumn,
}: BestModelBannerProps) {
  return (
    <Card className="border-primary/30 bg-card shadow-sm transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-bold">
            Best Model: {bestModel.name}
          </CardTitle>
          <Badge className="bg-primary text-primary-foreground text-xs">
            Top Score
          </Badge>
        </div>
        <CardDescription className="text-xs mt-1">
          {testCount ? `${testCount} test samples` : "Test evaluation"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <ModelMetricBox label="Primary" value={bestModel.primaryMetric} />
          <ModelMetricBox label="Secondary" value={bestModel.secondaryMetric} />
          <ModelMetricBox label="Features" value={featureCount} />
          <ModelMetricBox label="Target" value={targetColumn} truncate />
        </div>
      </CardContent>
    </Card>
  );
}
