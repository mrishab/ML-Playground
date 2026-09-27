import type { DatasetRowData } from "@/types/dataset";
import type { ProblemType } from "@/stores/mlConfig";
import { inferColumnTypes, type ColumnTypeMap } from "./inferColumnTypes";
import { detectClassification } from "./detectClassification";

const COMMON_TARGET_NAMES = new Set([
  "target",
  "label",
  "class",
  "outcome",
  "y",
  "status",
  "churn",
  "survived",
  "species",
  "dependent",
]);

export function findSuggestedTarget(headers: string[]): string {
  for (let i = headers.length - 1; i >= 0; i--) {
    if (COMMON_TARGET_NAMES.has(headers[i].toLowerCase())) {
      return headers[i];
    }
  }
  return headers.length > 0 ? headers[headers.length - 1] : "";
}

export function inferProblemTypeAndTarget(
  rows: DatasetRowData[],
  headers: string[],
): {
  suggestedProblemType: ProblemType;
  suggestedTarget: string;
  columnTypes: ColumnTypeMap;
} {
  const columnTypes = inferColumnTypes(rows, headers);
  const suggestedTarget = findSuggestedTarget(headers);

  let suggestedProblemType: ProblemType = "regression";
  if (suggestedTarget) {
    const targetType = columnTypes[suggestedTarget];
    if (targetType === "text" || targetType === "boolean") {
      suggestedProblemType = "classification";
    } else if (detectClassification(rows, suggestedTarget)) {
      suggestedProblemType = "classification";
    }
  }

  return { suggestedProblemType, suggestedTarget, columnTypes };
}
