import { Check, Circle } from "lucide-react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";

const steps = ["Dataset", "Explore", "Train", "Compare"] as const;

export function PipelineProgress() {
  const hasDataset = useDatasetStore((state) => state.df !== null);
  const isSplit = useMLConfigStore((state) => state.isSplit);
  const linReg = useTrainingResultsStore(
    (state) => state.linearRegression.metrics,
  );
  const knn = useTrainingResultsStore((state) => state.knn.metrics);
  const lda = useTrainingResultsStore((state) => state.lda.metrics);
  const logReg = useTrainingResultsStore(
    (state) => state.logisticRegression.metrics,
  );
  const hasModel =
    linReg !== null || knn !== null || lda !== null || logReg !== null;

  const completedIndex = hasModel ? 2 : isSplit ? 1 : hasDataset ? 0 : -1;

  return (
    <div className="flex items-center gap-2 px-4 py-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          {i <= completedIndex ? (
            <Check className="h-3 w-3 text-primary" />
          ) : (
            <Circle className="h-3 w-3 text-muted-foreground/40" />
          )}
          <span
            className={`text-xs transition-colors duration-300 ${i <= completedIndex ? "font-medium text-primary" : "text-muted-foreground/40"}`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-4 transition-colors duration-300 ${i < completedIndex ? "bg-primary" : "bg-muted-foreground/20"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
