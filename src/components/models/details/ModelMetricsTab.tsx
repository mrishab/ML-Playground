import type { SavedModel } from "@/types/savedModel";

export function ModelMetricsTab({ model }: { model: SavedModel }) {
  const reg = model.regressionMetrics;
  const cls = model.classificationMetrics;
  const km = model.kmeansMetrics;

  return (
    <div className="flex flex-col gap-3 py-2 text-xs">
      {reg && (
        <div className="grid grid-cols-3 gap-2">
          <MetricBox label="R² Score" val={reg.rSquared.toFixed(4)} />
          <MetricBox label="MSE" val={reg.mse.toFixed(4)} />
          <MetricBox label="RMSE" val={Math.sqrt(reg.mse).toFixed(4)} />
        </div>
      )}
      {cls && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <MetricBox label="Accuracy" val={`${(cls.accuracy * 100).toFixed(1)}%`} />
          <MetricBox label="Macro F1" val={`${(cls.macroF1 * 100).toFixed(1)}%`} />
          <MetricBox label="Precision" val={`${(cls.macroPrecision * 100).toFixed(1)}%`} />
          <MetricBox label="Recall" val={`${(cls.macroRecall * 100).toFixed(1)}%`} />
        </div>
      )}
      {km && (
        <div className="grid grid-cols-2 gap-2">
          <MetricBox label="Clusters (k)" val={String(km.k)} />
          <MetricBox label="Inertia" val={km.inertia.toFixed(2)} />
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, val }: { label: string; val: string }) {
  return (
    <div className="rounded border border-border/70 p-2 bg-muted/20">
      <span className="text-muted-foreground block text-[10px]">{label}</span>
      <span className="font-mono text-sm font-semibold">{val}</span>
    </div>
  );
}
