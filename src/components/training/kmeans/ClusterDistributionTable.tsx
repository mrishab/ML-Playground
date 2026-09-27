import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { KMeansMetrics } from "@/types/kmeans";

export function ClusterDistributionTable({
  metrics,
}: {
  metrics: KMeansMetrics;
}) {
  const total = metrics.clusterSizes.reduce((a, b) => a + b, 0);

  const rows = useMemo(
    () =>
      metrics.clusterSizes.map((size, idx) => ({
        id: `cluster-row-${idx}`,
        name: `Cluster ${idx}`,
        size,
        pct: total > 0 ? `${((size / total) * 100).toFixed(1)}%` : "0%",
      })),
    [metrics.clusterSizes, total],
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cluster</TableHead>
            <TableHead className="text-right">Sample Count</TableHead>
            <TableHead className="text-right">Proportion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell className="text-right font-mono">{row.size}</TableCell>
              <TableCell className="text-right font-mono">{row.pct}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
