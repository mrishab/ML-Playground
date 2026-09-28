import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { KMeansMetrics } from "@/types/kmeans";
import { ClusterScatterPlot } from "./ClusterScatterPlot";
import { ClusterDistributionTable } from "./ClusterDistributionTable";

export function ClusterDetailsTabs({
  data,
  metrics,
}: {
  data: number[][];
  metrics: KMeansMetrics;
}) {
  return (
    <Tabs defaultValue="scatter" className="w-full">
      <TabsList>
        <TabsTrigger value="scatter">Cluster Plot</TabsTrigger>
        <TabsTrigger value="distribution">Distribution</TabsTrigger>
      </TabsList>
      <TabsContent value="scatter" className="space-y-4">
        <ClusterScatterPlot data={data} metrics={metrics} />
      </TabsContent>
      <TabsContent value="distribution" className="space-y-4">
        <ClusterDistributionTable metrics={metrics} />
      </TabsContent>
    </Tabs>
  );
}
