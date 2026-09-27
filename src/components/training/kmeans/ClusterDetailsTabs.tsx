import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { KMeansMetrics } from "@/types/kmeans";
import type { LossTelemetry } from "@/types/loss";
import { ClusterScatterPlot } from "./ClusterScatterPlot";
import { ClusterDistributionTable } from "./ClusterDistributionTable";
import { TrainingLossCard } from "../loss-plot/TrainingLossCard";

export function ClusterDetailsTabs({
  data,
  metrics,
  telemetry,
}: {
  data: number[][];
  metrics: KMeansMetrics;
  telemetry: LossTelemetry | null | undefined;
}) {
  return (
    <Tabs defaultValue="scatter" className="w-full">
      <TabsList>
        <TabsTrigger value="scatter">Cluster Plot</TabsTrigger>
        <TabsTrigger value="loss">Inertia Loss Curve</TabsTrigger>
        <TabsTrigger value="distribution">Distribution</TabsTrigger>
      </TabsList>
      <TabsContent value="scatter" className="space-y-4">
        <ClusterScatterPlot data={data} metrics={metrics} />
      </TabsContent>
      <TabsContent value="loss" className="space-y-4">
        <TrainingLossCard telemetry={telemetry} />
      </TabsContent>
      <TabsContent value="distribution" className="space-y-4">
        <ClusterDistributionTable metrics={metrics} />
      </TabsContent>
    </Tabs>
  );
}
