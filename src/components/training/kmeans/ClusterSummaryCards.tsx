import { Card, CardContent } from "@/components/ui/card";
import type { KMeansMetrics } from "@/types/kmeans";

const CARD_HOVER = "hover:border-primary/40 hover:-translate-y-0.5";

export function ClusterSummaryCards({ metrics }: { metrics: KMeansMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Card className={CARD_HOVER}>
        <CardContent className="p-4 text-center">
          <div className="text-xs text-muted-foreground">Inertia (WCSS)</div>
          <div className="text-lg font-bold font-mono text-primary">
            {metrics.inertia.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card className={CARD_HOVER}>
        <CardContent className="p-4 text-center">
          <div className="text-xs text-muted-foreground">Clusters (k)</div>
          <div className="text-lg font-bold font-mono">{metrics.k}</div>
        </CardContent>
      </Card>
      <Card className={CARD_HOVER}>
        <CardContent className="p-4 text-center">
          <div className="text-xs text-muted-foreground">Iterations</div>
          <div className="text-lg font-bold font-mono">
            {metrics.iterations}
          </div>
        </CardContent>
      </Card>
      <Card className={CARD_HOVER}>
        <CardContent className="p-4 text-center">
          <div className="text-xs text-muted-foreground">Largest Cluster</div>
          <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {Math.max(...metrics.clusterSizes)} pts
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
