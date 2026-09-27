import type { EvaluatedModel } from "./types";
import { EvaluatedModelCard } from "./EvaluatedModelCard";

interface EvaluatedModelsGridProps {
  models: EvaluatedModel[];
}

export function EvaluatedModelsGrid({ models }: EvaluatedModelsGridProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold tracking-tight text-foreground">
        Model Leaderboard
      </h4>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {models.map((m, idx) => (
          <EvaluatedModelCard key={m.name} model={m} rank={idx + 1} />
        ))}
      </div>
    </div>
  );
}
