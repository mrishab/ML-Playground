import type { ProblemType } from "@/stores/mlConfig";

export interface ParsedCSVResult {
  fileName: string;
  fileSize: number;
  headers: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  columnCount: number;
  suggestedName: string;
  suggestedProblemType: ProblemType;
  suggestedTarget: string;
  previewRows: Record<string, unknown>[];
  hasMissingValues: boolean;
  missingCount: number;
  columnTypes: Record<string, "numeric" | "text" | "boolean">;
}
