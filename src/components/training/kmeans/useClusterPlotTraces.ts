import { useMemo } from "react";
import type { Data } from "plotly.js";
import type { KMeansMetrics } from "@/types/kmeans";

const CLUSTER_COLORS = [
  "#0284c7",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export function useClusterPlotTraces(
  data: number[][],
  metrics: KMeansMetrics,
): Data[] {
  return useMemo(() => {
    const traces: Data[] = [];
    const k = metrics.k;

    for (let c = 0; c < k; c++) {
      const clusterPoints = data.filter((_, i) => metrics.labels[i] === c);
      traces.push({
        x: clusterPoints.map((p) => p[0]),
        y: clusterPoints.map((p) => p[1] ?? p[0]),
        mode: "markers",
        type: "scatter",
        name: `Cluster ${c} (${metrics.clusterSizes[c]} pts)`,
        marker: {
          size: 6,
          color: CLUSTER_COLORS[c % CLUSTER_COLORS.length],
          opacity: 0.75,
        },
      });
    }

    traces.push({
      x: metrics.centroids.map((c) => c[0]),
      y: metrics.centroids.map((c) => c[1] ?? c[0]),
      mode: "markers",
      type: "scatter",
      name: "Centroids",
      marker: {
        size: 14,
        symbol: "cross",
        color: "#ffffff",
        line: { color: "#000000", width: 2 },
      },
    });

    return traces;
  }, [data, metrics]);
}
