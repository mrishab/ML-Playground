import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

export function ModelMetricBadges({ model }: { model: SavedModel }) {
  const reg = model.regressionMetrics;
  const cls = model.classificationMetrics;
  const km = model.kmeansMetrics;
  const iso = model.isolationForestMetrics;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {reg && (
        <>
          <Badge variant="secondary" className="text-xs font-mono">
            R²: {reg.rSquared !== undefined ? reg.rSquared.toFixed(3) : "—"}
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono">
            MSE: {reg.mse !== undefined ? reg.mse.toFixed(4) : "—"}
          </Badge>
        </>
      )}
      {cls && (
        <>
          <Badge variant="secondary" className="text-xs font-mono">
            Acc: {(cls.accuracy * 100).toFixed(1)}%
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono">
            F1: {cls.macroF1 ? (cls.macroF1 * 100).toFixed(1) + "%" : "—"}
          </Badge>
        </>
      )}
      {km && (
        <>
          <Badge variant="secondary" className="text-xs font-mono">k = {km.k}</Badge>
          <Badge variant="secondary" className="text-xs font-mono">Inertia: {km.inertia.toFixed(1)}</Badge>
        </>
      )}
      {iso && (
        <>
          <Badge variant="secondary" className="text-xs font-mono">
            Anomalies: {iso.anomalyCount}
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono">
            Thresh: {iso.thresholdScore.toFixed(3)}
          </Badge>
        </>
      )}
    </div>
  );
}
