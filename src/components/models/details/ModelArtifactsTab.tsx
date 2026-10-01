import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

export function ModelArtifactsTab({ model }: { model: SavedModel }) {
  const artifacts = model.modelArtifacts;
  if (!artifacts) {
    return <p className="text-xs text-muted-foreground py-4">No model parameters available.</p>;
  }

  return (
    <div className="flex flex-col gap-3 py-2 text-xs">
      {artifacts.formula && (
        <div className="rounded-lg border border-border/70 p-3 bg-muted/20">
          <span className="text-muted-foreground block text-[11px] mb-1 font-semibold">
            Learned Model Equation
          </span>
          <pre className="font-mono text-xs text-primary whitespace-pre-wrap overflow-x-auto">
            {artifacts.formula}
          </pre>
        </div>
      )}

      {artifacts.coefficients && artifacts.coefficients.length > 0 && (
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
          <span className="text-muted-foreground block text-[11px] mb-2 font-semibold">
            Feature Weights / Coefficients
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {artifacts.coefficients.map((c) => (
              <div key={c.feature} className="flex justify-between border rounded p-1.5 bg-background font-mono text-[11px]">
                <span className="text-muted-foreground truncate">{c.feature}</span>
                <span className="font-semibold text-foreground">{c.weight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {artifacts.classes && (
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
          <span className="text-muted-foreground block text-[11px] mb-1.5">Class Labels</span>
          <div className="flex flex-wrap gap-1.5">
            {artifacts.classes.map((cls) => (
              <Badge key={cls} variant="secondary" className="font-mono text-xs">
                {cls}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
