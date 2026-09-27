import type { DatasetRowData } from "@/types/dataset";
import type { ProblemType } from "@/stores/mlConfig";
import type { ColumnTypeMap } from "./inferColumnTypes";

export interface ParsedCSVResult {
  fileName: string;
  fileSize: number;
  headers: string[];
  rows: DatasetRowData[];
  rowCount: number;
  columnCount: number;
  suggestedName: string;
  suggestedProblemType: ProblemType;
  suggestedTarget: string;
  previewRows: DatasetRowData[];
  hasMissingValues: boolean;
  missingCount: number;
  columnTypes: ColumnTypeMap;
}
