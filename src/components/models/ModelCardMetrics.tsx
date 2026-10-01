import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

export function ModelCardMetrics({ model }: { model: SavedModel }) {
  const reg = model.regressionMetrics;
  const cls = model.classificationMetrics;
  const km = model.kmeansMetrics;

  return (
    <div className="flex flex-col gap-2 pt-1 pb-2">
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
            <Badge variant="secondary" className="text-xs font-mono">
              k = {km.k}
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono">
              Inertia: {km.inertia.toFixed(1)}
            </Badge>
          </>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>
          {model.splitConfig.features.length} features
          {model.splitConfig.targetColumn ? ` • Target: ${model.splitConfig.targetColumn}` : ""}
        </span>
        <span>
          {model.splitConfig.trainSamples} train / {model.splitConfig.testSamples} test
        </span>
      </div>
    </div>
  );
}
