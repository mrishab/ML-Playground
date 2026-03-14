export type ColumnStats = {
  column: string;
  dtype: string;
  count: number;
  missing: number;
  unique: number;
  mean?: number;
  std?: number;
  min?: number;
  max?: number;
  median?: number;
};

export type OverviewStats = {
  rows: number;
  columns: number;
  numericColumns: number;
  categoricalColumns: number;
};
