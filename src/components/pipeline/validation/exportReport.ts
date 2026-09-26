import type { EvaluatedModel } from "./types";
import type { SelectedFeature } from "@/stores/mlConfig";

interface ExportReportParams {
  selectedDataset: string;
  problemType: string;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
  trainRows?: number;
  testRows?: number;
  models: EvaluatedModel[];
}

export function exportValidationReport({
  selectedDataset,
  problemType,
  targetColumn,
  selectedFeatures,
  trainRows,
  testRows,
  models,
}: ExportReportParams) {
  const report = {
    pipeline: "ML Playground",
    timestamp: new Date().toISOString(),
    dataset: selectedDataset,
    problemType,
    targetColumn,
    features: selectedFeatures.map((f) => f.column),
    trainRows,
    testRows,
    models: models.map((m) => ({
      name: m.name,
      type: m.type,
      metrics: m.metrics,
    })),
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ml-results-${selectedDataset.toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
