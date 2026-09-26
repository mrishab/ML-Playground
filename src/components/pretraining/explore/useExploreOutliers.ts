import { useCallback, useMemo, useState } from "react";
import {
  computeColumnOutliers,
  partitionOutlierRows,
  filterOutlierDf,
} from "./outlierDetection";
import {
  type OutlierParams,
  buildOutlierBounds,
  sumOutliers,
} from "./outlierBounds";

export function useExploreOutliers({
  df,
  numericColumns,
  setDf,
  clearSplitData,
  resetTrainingResults,
}: OutlierParams) {
  const [iqrMultiplier, setIqrMultiplier] = useState(1.5);

  const numericColumnData = useMemo(
    () => (df ? computeColumnOutliers(df, numericColumns, iqrMultiplier) : []),
    [df, numericColumns, iqrMultiplier],
  );

  const totalOutlierValues = useMemo(
    () => sumOutliers(numericColumnData),
    [numericColumnData],
  );

  const outlierBounds = useMemo(
    () => buildOutlierBounds(numericColumnData),
    [numericColumnData],
  );

  const outlierRows = useMemo(() => {
    if (!df || numericColumns.length === 0) return { outlier: [], inlier: [] };
    return partitionOutlierRows(df, numericColumns, outlierBounds);
  }, [df, numericColumns, outlierBounds]);

  const dropOutliers = useCallback(() => {
    if (!df || outlierRows.outlier.length === 0) return;
    setDf(filterOutlierDf(df, outlierRows.inlier));
    clearSplitData();
    resetTrainingResults();
  }, [clearSplitData, df, outlierRows, resetTrainingResults, setDf]);

  return {
    iqrMultiplier,
    setIqrMultiplier,
    numericColumnData,
    totalOutlierValues,
    removedRowsAfterOutlierDrop: outlierRows.outlier.length,
    dropOutliers,
  };
}
