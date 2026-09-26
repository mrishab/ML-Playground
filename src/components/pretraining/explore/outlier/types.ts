export type NumericColumnData = {
  column: string;
  values: number[];
};

export type OutlierVisualizerProps = {
  numericColumnData: NumericColumnData[];
  totalOutlierValues: number;
  removedRowsAfterOutlierDrop: number;
  iqrMultiplier: number;
  setIqrMultiplier: (value: number) => void;
  dropOutliers: () => void;
};
