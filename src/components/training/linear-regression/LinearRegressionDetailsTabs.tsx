import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RegressionMetrics } from "@/types/regression";
import type { LossTelemetry } from "@/types/loss";
import { PredictionsTable } from "./PredictionsTable";
import { MSEBreakdown } from "./MSEBreakdown";
import { RSEBreakdown } from "./RSEBreakdown";
import { RSquaredBreakdown } from "./RSquaredBreakdown";
import { TrainingLossCard } from "@/components/training/loss-plot/TrainingLossCard";

export function LinearRegressionDetailsTabs({
  metrics,
  telemetry,
}: {
  metrics: RegressionMetrics;
  telemetry?: LossTelemetry | null;
}) {
  return (
    <Tabs defaultValue="predictions" className="w-full">
      <TabsList>
        <TabsTrigger value="predictions">Predictions</TabsTrigger>
        <TabsTrigger value="loss">Loss Curve</TabsTrigger>
        <TabsTrigger value="mse">MSE</TabsTrigger>
        <TabsTrigger value="rse">RSE</TabsTrigger>
        <TabsTrigger value="rsquared">R²</TabsTrigger>
      </TabsList>
      <TabsContent value="predictions">
        <PredictionsTable metrics={metrics} />
      </TabsContent>
      <TabsContent value="loss">
        <TrainingLossCard telemetry={telemetry} />
      </TabsContent>
      <TabsContent value="mse">
        <MSEBreakdown metrics={metrics} />
      </TabsContent>
      <TabsContent value="rse">
        <RSEBreakdown metrics={metrics} />
      </TabsContent>
      <TabsContent value="rsquared">
        <RSquaredBreakdown metrics={metrics} />
      </TabsContent>
    </Tabs>
  );
}
