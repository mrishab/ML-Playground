export type ImputationStrategy =
  | "mean"
  | "median"
  | "mode"
  | "constant"
  | "ffill"
  | "bfill";

export type DropNullStrategy = "any" | "all" | "selected";

export type OutlierStrategy = "clip" | "drop";

export type FilterOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "greater_than"
  | "less_than"
  | "is_null"
  | "is_not_null";

export type RowFilter = {
  column: string;
  operator: FilterOperator;
  value: string;
};

export type CleanupHistoryEntry = {
  id: string;
  description: string;
  timestamp: number;
  rowsBefore: number;
  rowsAfter: number;
  colsBefore: number;
  colsAfter: number;
};

export type MissingSummary = {
  totalCells: number;
  totalMissing: number;
  missingPercent: number;
  columnsWithMissing: number;
  byColumn: {
    column: string;
    missing: number;
    percent: number;
    dtype: string;
  }[];
};
