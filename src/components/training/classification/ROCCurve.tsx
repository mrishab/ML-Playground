import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

type ROCCurveProps = {
  metrics: ClassificationMetrics;
};

// Color palette for multi-class ROC curves
const COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#22c55e", // green
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#f97316", // orange
];

export function ROCCurve({ metrics }: ROCCurveProps) {
  const { rocCurves } = metrics;

  // Build plotly traces for each class
  const traces: Plotly.Data[] = rocCurves.map((curve, i) => ({
    x: curve.points.map((p) => p.fpr),
    y: curve.points.map((p) => p.tpr),
    type: "scatter" as const,
    mode: "lines" as const,
    name: `${curve.label} (AUC = ${formatNumber(curve.auc)})`,
    line: { color: COLORS[i % COLORS.length], width: 2 },
  }));

  // Add diagonal reference line
  traces.push({
    x: [0, 1],
    y: [0, 1],
    type: "scatter" as const,
    mode: "lines" as const,
    name: "Random (AUC = 0.5)",
    line: { color: "#6b7280", width: 1, dash: "dash" },
    showlegend: true,
  });

  const layout: Partial<Plotly.Layout> = {
    xaxis: {
      title: { text: "False Positive Rate (FPR)" },
      range: [0, 1],
      dtick: 0.2,
    },
    yaxis: {
      title: { text: "True Positive Rate (TPR)" },
      range: [0, 1.05],
      dtick: 0.2,
    },
    legend: {
      x: 0.4,
      y: 0.05,
      bgcolor: "rgba(0,0,0,0)",
    },
    margin: { t: 20, r: 20, b: 60, l: 60 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { color: "#a1a1aa" },
    height: 400,
    autosize: true,
  };

  const config: Partial<Plotly.Config> = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">ROC Curve & AUC</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            The <strong>ROC curve</strong> plots True Positive Rate vs False
            Positive Rate at various thresholds using a one-vs-rest approach.
            The <strong>AUC</strong> (Area Under Curve) summarizes overall
            classifier performance: 1.0 = perfect, 0.5 = random.
          </p>
        </div>

        {/* Plot */}
        <Plot
          data={traces}
          layout={layout}
          config={config}
          useResizeHandler
          className="w-full"
        />

        {/* AUC Summary */}
        <div className="space-y-3">
          {rocCurves.map((curve, i) => (
            <div
              key={curve.label}
              className="flex items-center justify-between rounded border p-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm">AUC for "{curve.label}"</span>
              </div>
              <Badge
                variant="secondary"
                style={{ color: COLORS[i % COLORS.length] }}
              >
                {formatNumber(curve.auc)}
              </Badge>
            </div>
          ))}
        </div>

        {/* Interpretation */}
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-4">
          <p className="text-sm font-medium">Interpretation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            A curve hugging the top-left corner indicates strong classification.
            The dashed diagonal represents a random classifier (AUC = 0.5). AUC
            values above 0.8 are generally considered good; above 0.9 is
            excellent.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
