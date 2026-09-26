import { useMemo } from "react";
import Plot from "react-plotly.js";
import { useTheme } from "next-themes";
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Build plotly traces for each class
  const traces: Plotly.Data[] = useMemo(() => {
    const classTraces: Plotly.Data[] = rocCurves.map((curve, i) => ({
      x: curve.points.map((p) => p.fpr),
      y: curve.points.map((p) => p.tpr),
      type: "scatter" as const,
      mode: "lines" as const,
      name: `${curve.label} (AUC = ${formatNumber(curve.auc)})`,
      line: { color: COLORS[i % COLORS.length], width: 2 },
    }));

    // Add diagonal reference line
    classTraces.push({
      x: [0, 1],
      y: [0, 1],
      type: "scatter" as const,
      mode: "lines" as const,
      name: "Random (AUC = 0.5)",
      line: {
        color: isDark ? "#64748b" : "#94a3b8",
        width: 1,
        dash: "dash",
      },
      showlegend: true,
    });

    return classTraces;
  }, [rocCurves, isDark]);

  const layout: Partial<Plotly.Layout> = useMemo(
    () => ({
      xaxis: {
        title: { text: "False Positive Rate (FPR)" },
        range: [0, 1],
        dtick: 0.2,
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      yaxis: {
        title: { text: "True Positive Rate (TPR)" },
        range: [0, 1.05],
        dtick: 0.2,
        gridcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        zerolinecolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      },
      legend: {
        x: 0.4,
        y: 0.05,
        bgcolor: "rgba(0,0,0,0)",
      },
      margin: { t: 20, r: 20, b: 60, l: 60 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: isDark ? "#cbd5e1" : "#334155" },
      height: 400,
      autosize: true,
    }),
    [isDark],
  );

  const config: Partial<Plotly.Config> = useMemo(
    () => ({
      displayModeBar: false,
      responsive: true,
    }),
    [],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">ROC Curve & AUC</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plot */}
        <Plot
          data={traces}
          layout={layout}
          config={config}
          useResizeHandler
          className="w-full"
        />

        {/* AUC Summary */}
        <div className="space-y-2">
          {rocCurves.map((curve, i) => (
            <div
              key={curve.label}
              className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm">AUC ({curve.label})</span>
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
      </CardContent>
    </Card>
  );
}
