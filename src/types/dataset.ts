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

export type FeatureSeriesData = Record<string, number[]>;

export type FeatureRowData = Record<string, number>;

export type ColumnBounds = {
  lower: number;
  upper: number;
};

export type OutlierBoundsMap = Record<string, ColumnBounds>;

export type RawCSVRow = Record<string, string>;

export type DatasetRowData = Record<string, unknown>;
