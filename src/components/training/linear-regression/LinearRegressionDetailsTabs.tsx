import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RegressionMetrics } from "@/types/regression";
import { PredictionsTable } from "./PredictionsTable";
import { MSEBreakdown } from "./MSEBreakdown";
import { RSEBreakdown } from "./RSEBreakdown";
import { RSquaredBreakdown } from "./RSquaredBreakdown";
export function LinearRegressionDetailsTabs({
  metrics,
}: {
  metrics: RegressionMetrics;
}) {
  return (
    <Tabs defaultValue="predictions" className="w-full">
      <TabsList>
        <TabsTrigger value="predictions">Predictions</TabsTrigger>
        <TabsTrigger value="mse">MSE</TabsTrigger>
        <TabsTrigger value="rse">RSE</TabsTrigger>
        <TabsTrigger value="rsquared">R²</TabsTrigger>
      </TabsList>
      <TabsContent value="predictions">
        <PredictionsTable metrics={metrics} />
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
