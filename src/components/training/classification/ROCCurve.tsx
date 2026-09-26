import Plot from "react-plotly.js";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClassificationMetrics } from "@/types/classification";
import { useRocTraces } from "./roc/traces";
import { useRocLayout, ROC_CONFIG } from "./roc/layout";
import { ROCAUCSummary } from "./roc/ROCAUCSummary";

export function ROCCurve({ metrics }: { metrics: ClassificationMetrics }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const traces = useRocTraces(metrics.rocCurves, isDark);
  const layout = useRocLayout(isDark);

  return (
    <Card className="transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-base">ROC Curve & AUC</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Plot
          data={traces}
          layout={layout}
          config={ROC_CONFIG}
          useResizeHandler
          className="w-full"
        />
        <ROCAUCSummary rocCurves={metrics.rocCurves} />
      </CardContent>
    </Card>
  );
}
