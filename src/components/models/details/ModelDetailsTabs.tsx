import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelOverviewTab } from "./ModelOverviewTab";
import { ModelMetricsTab } from "./ModelMetricsTab";
import { ModelAnalysisTab } from "./ModelAnalysisTab";
import { ModelArtifactsTab } from "./ModelArtifactsTab";
import { ModelTelemetryTab } from "./ModelTelemetryTab";
import type { SavedModel } from "@/types/savedModel";

export function ModelDetailsTabs({ model }: { model: SavedModel }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-5 w-full h-8 text-xs">
        <TabsTrigger value="overview" className="text-xs py-1">Overview</TabsTrigger>
        <TabsTrigger value="metrics" className="text-xs py-1">Metrics</TabsTrigger>
        <TabsTrigger value="analysis" className="text-xs py-1">Analysis</TabsTrigger>
        <TabsTrigger value="artifacts" className="text-xs py-1">Parameters</TabsTrigger>
        <TabsTrigger value="telemetry" className="text-xs py-1">Loss Curve</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <ModelOverviewTab model={model} />
      </TabsContent>
      <TabsContent value="metrics">
        <ModelMetricsTab model={model} />
      </TabsContent>
      <TabsContent value="analysis">
        <ModelAnalysisTab model={model} />
      </TabsContent>
      <TabsContent value="artifacts">
        <ModelArtifactsTab model={model} />
      </TabsContent>
      <TabsContent value="telemetry">
        <ModelTelemetryTab model={model} />
      </TabsContent>
    </Tabs>
  );
}
