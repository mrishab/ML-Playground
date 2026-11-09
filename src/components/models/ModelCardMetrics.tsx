import { ModelMetricBadges } from "./ModelMetricBadges";
import type { SavedModel } from "@/types/savedModel";

export function ModelCardMetrics({ model }: { model: SavedModel }) {
  return (
    <div className="flex flex-col gap-2 pt-1 pb-2">
      <ModelMetricBadges model={model} />
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
