import type { CleanupHistoryEntry } from "./dataCleanup";

export type DatasetSource = "built-in" | "uploaded" | "cleaned" | "custom";
export type ColumnDtype = "number" | "string" | "boolean" | "float32" | "int32" | string;
export type ColumnDtypeMap = Record<string, ColumnDtype>;

export type SavedDataset = {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  source: DatasetSource;
  originalDatasetName?: string;
  rowCount: number;
  columnCount: number;
  columns: string[];
  dtypes: ColumnDtypeMap;
  data: (string | number | boolean | null)[][];
  summary?: {
    numericColumns: number;
    categoricalColumns: number;
    nullCount: number;
    duplicateRows: number;
  };
  history?: CleanupHistoryEntry[];
  sizeBytes: number;
};

export type SavedDatasetSummary = Omit<SavedDataset, "data">;
