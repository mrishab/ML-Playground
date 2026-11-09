import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnomalyScatterPlot } from "./AnomalyScatterPlot";
import { TopAnomaliesTable } from "./TopAnomaliesTable";
import { FeatureImportanceCard } from "../random-forest/FeatureImportanceCard";
import type { IsolationForestMetrics } from "@/types/isolationForest";

type Props = {
  metrics: IsolationForestMetrics;
};

export function IsolationForestDetailsTabs({ metrics }: Props) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="scatter" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="scatter">2D Outlier Map</TabsTrigger>
          <TabsTrigger value="table">Top Anomalies</TabsTrigger>
          <TabsTrigger value="splits">Feature Splits</TabsTrigger>
        </TabsList>
        <TabsContent value="scatter" className="pt-2">
          <AnomalyScatterPlot metrics={metrics} />
        </TabsContent>
        <TabsContent value="table" className="pt-2">
          <TopAnomaliesTable anomalies={metrics.topAnomalies} />
        </TabsContent>
        <TabsContent value="splits" className="pt-2">
          <FeatureImportanceCard importances={metrics.featureImportance} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
