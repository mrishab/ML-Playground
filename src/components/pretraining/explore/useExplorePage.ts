import { useCallback, useMemo, useState } from "react";
import * as dfd from "danfojs";
import type { DataFrame } from "danfojs";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore, type SelectedFeature } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineStore } from "@/stores/pipeline";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { loadDatasetConfig } from "@/lib/datasetConfig";
import { DATASETS } from "@/components/data-ingestion/select-dataset/useDatasetSelect";
import type {
  FeatureSeriesData,
  FeatureRowData,
  OutlierBoundsMap,
} from "@/types/dataset";

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function applyTransformation(
  df: DataFrame,
  feature: SelectedFeature,
): { column: number[]; name: string } {
  const values = df.column(feature.column).values as number[];
  const baseName = feature.column;

  switch (feature.transformation) {
    case "polynomial": {
      const degree = feature.polynomialDegree ?? 2;
      return {
        column: values.map((v) => Math.pow(v, degree)),
        name: `${baseName}^${degree}`,
      };
    }
    case "interaction": {
      const interactWith = feature.interactionWith;
      if (interactWith) {
        const otherValues = df.column(interactWith).values as number[];
        return {
          column: values.map((v, i) => v * otherValues[i]),
          name: `${baseName}*${interactWith}`,
        };
      }
      return { column: values, name: baseName };
    }
    default:
      return { column: values, name: baseName };
  }
}

/** Apply transformations and deduplicate column names for a set of features. */
function buildFeatureColumns(
  df: DataFrame,
  features: SelectedFeature[],
): FeatureSeriesData {
  const data: FeatureSeriesData = {};
  for (const feature of features) {
    const { column, name } = applyTransformation(df, feature);
    let finalName = name;
    let counter = 1;
    while (finalName in data) {
      finalName = `${name}_${counter}`;
      counter++;
    }
    data[finalName] = column;
  }
  return data;
}

function toFiniteNumbers(values: unknown[]): number[] {
  return values.filter(
    (value): value is number =>
      typeof value === "number" && Number.isFinite(value),
  );
}

function getQuantile(sortedValues: number[], percentile: number): number {
  if (sortedValues.length === 0) return 0;
  if (sortedValues.length === 1) return sortedValues[0];

  const position = (sortedValues.length - 1) * percentile;
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);
  const weight = position - lowerIndex;
  const lower = sortedValues[lowerIndex];
  const upper = sortedValues[upperIndex];
  return lower + (upper - lower) * weight;
}

export function useExplorePage() {
  const { df, selectedDataset, setDf } = useDatasetStore();
  const {
    problemType,
    shuffle,
    testSplitPercent,
    targetColumn,
    selectedFeatures,
    xTrain,
    xTest,
    isSplit,
    setProblemType,
    setShuffle,
    setTestSplitPercent,
    setTargetColumn,
    addFeature,
    removeFeature,
    updateFeatureTransformation,
    clearFeatures,
    setFeatures,
    setSplitData,
    clearSplitData,
  } = useMLConfigStore();
  const resetTrainingResults = useTrainingResultsStore(
    (state) => state.resetAll,
  );
  const { isExploreDirty } = usePipelineSteps();
  const revertExploreChanges = usePipelineStore(
    (state) => state.revertExploreChanges,
  );

  const [isLoadingConfig, setIsLoadingConfig] = useState(false);
  const [iqrMultiplier, setIqrMultiplier] = useState(1.5);

  const columns = useMemo(() => {
    if (!df) return [];
    return (df.columns as string[]).filter((col) => col !== "");
  }, [df]);

  const numericColumns = useMemo(() => {
    if (!df) return [];
    return columns.filter((col) => {
      const dtype = df.column(col).dtype;
      return dtype === "float32" || dtype === "int32";
    });
  }, [df, columns]);

  const availableInteractionColumns = useMemo(() => {
    return numericColumns;
  }, [numericColumns]);

  const numericColumnData = useMemo(() => {
    if (!df) return [];

    return numericColumns
      .map((column) => {
        const rawValues = df.column(column).values as unknown[];
        const values = toFiniteNumbers(rawValues);
        if (values.length === 0) return null;

        const sorted = [...values].sort((a, b) => a - b);
        const q1 = getQuantile(sorted, 0.25);
        const q3 = getQuantile(sorted, 0.75);
        const iqr = q3 - q1;
        const lower = q1 - iqrMultiplier * iqr;
        const upper = q3 + iqrMultiplier * iqr;
        const outlierCount = values.filter(
          (value) => value < lower || value > upper,
        ).length;

        return {
          column,
          values,
          outlierCount,
          lower,
          upper,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }, [df, iqrMultiplier, numericColumns]);

  const totalOutlierValues = useMemo(() => {
    return numericColumnData.reduce(
      (count, entry) => count + entry.outlierCount,
      0,
    );
  }, [numericColumnData]);

  const outlierBoundsByColumn = useMemo<OutlierBoundsMap>(() => {
    const bounds: OutlierBoundsMap = {};
    for (const entry of numericColumnData) {
      bounds[entry.column] = { lower: entry.lower, upper: entry.upper };
    }
    return bounds;
  }, [numericColumnData]);

  /** Precompute which rows are outliers — shared by drop action and preview count. */
  const outlierRows = useMemo(() => {
    if (!df || numericColumns.length === 0) return { outlier: [], inlier: [] };

    const rowValues = df.values as unknown[][];
    const allColumns = df.columns as string[];
    const columnIndexes = new Map(
      allColumns.map((columnName, index) => [columnName, index] as const),
    );

    const isOutlierRow = (row: unknown[]): boolean =>
      numericColumns.some((columnName) => {
        const bounds = outlierBoundsByColumn[columnName];
        if (!bounds) return false;
        const columnIndex = columnIndexes.get(columnName);
        if (columnIndex === undefined) return false;
        const value = row[columnIndex];
        if (typeof value !== "number" || !Number.isFinite(value)) return false;
        return value < bounds.lower || value > bounds.upper;
      });

    const outlier: unknown[][] = [];
    const inlier: unknown[][] = [];
    for (const row of rowValues) {
      (isOutlierRow(row) ? outlier : inlier).push(row);
    }
    return { outlier, inlier };
  }, [df, numericColumns, outlierBoundsByColumn]);

  const dropOutliers = useCallback(() => {
    if (!df || outlierRows.outlier.length === 0) return;

    const allColumns = df.columns as string[];
    const filteredDf = new dfd.DataFrame(outlierRows.inlier, {
      columns: allColumns,
    });
    setDf(filteredDf);
    clearSplitData();
    resetTrainingResults();
  }, [clearSplitData, df, outlierRows, resetTrainingResults, setDf]);

  const removedRowsAfterOutlierDrop = outlierRows.outlier.length;

  const canSplit = useMemo(() => {
    return (
      df !== null &&
      targetColumn !== "" &&
      selectedFeatures.length > 0 &&
      !selectedFeatures.some((f) => f.column === targetColumn)
    );
  }, [df, targetColumn, selectedFeatures]);

  const performSplit = useCallback(() => {
    if (!df || !canSplit) return;

    resetTrainingResults();

    const nRows = df.shape[0];
    let indices = Array.from({ length: nRows }, (_, i) => i);

    if (shuffle) {
      indices = shuffleArray(indices);
    }

    const testSize = Math.floor(nRows * (testSplitPercent / 100));
    const trainSize = nRows - testSize;

    const trainIndices = indices.slice(0, trainSize);
    const testIndices = indices.slice(trainSize);

    const featureData = buildFeatureColumns(df, selectedFeatures);

    // Get y values
    const yFull = df.column(targetColumn);

    // Split into train/test
    const xTrainData: FeatureSeriesData = {};
    const xTestData: FeatureSeriesData = {};

    for (const colName of Object.keys(featureData)) {
      xTrainData[colName] = trainIndices.map((i) => featureData[colName][i]);
      xTestData[colName] = testIndices.map((i) => featureData[colName][i]);
    }

    const yValues = yFull.values as number[];
    const yTrainValues = trainIndices.map((i) => yValues[i]);
    const yTestValues = testIndices.map((i) => yValues[i]);

    const xTrainDf = new dfd.DataFrame(xTrainData);
    const xTestDf = new dfd.DataFrame(xTestData);
    const yTrainDf = new dfd.DataFrame({ [targetColumn]: yTrainValues });
    const yTestDf = new dfd.DataFrame({ [targetColumn]: yTestValues });

    setSplitData({
      xTrain: xTrainDf,
      xTest: xTestDf,
      yTrain: yTrainDf,
      yTest: yTestDf,
    });

    usePipelineStore.getState().recordSplit({
      datasetName: selectedDataset,
      problemType,
      targetColumn,
      selectedFeatures,
      testSplitPercent,
      shuffle,
    });
  }, [
    df,
    canSplit,
    shuffle,
    testSplitPercent,
    selectedFeatures,
    targetColumn,
    problemType,
    selectedDataset,
    resetTrainingResults,
    setSplitData,
  ]);

  const splitStats = useMemo(() => {
    if (!isSplit || !xTrain || !xTest) return null;
    return {
      trainRows: xTrain.shape[0],
      testRows: xTest.shape[0],
      featureCount: xTrain.shape[1],
      featureNames: xTrain.columns as string[],
    };
  }, [isSplit, xTrain, xTest]);

  // Preview data: selected columns from original df (before split)
  const previewData = useMemo(() => {
    if (!df || selectedFeatures.length === 0) return [];

    const featureData = buildFeatureColumns(df, selectedFeatures);

    // Add target column if selected
    if (targetColumn) {
      const targetValues = df.column(targetColumn).values as number[];
      featureData[`[Y] ${targetColumn}`] = targetValues;
    }

    const nRows = df.shape[0];
    const rows: FeatureRowData[] = [];
    for (let i = 0; i < nRows; i++) {
      const row: FeatureRowData = {};
      for (const colName of Object.keys(featureData)) {
        row[colName] = featureData[colName][i];
      }
      rows.push(row);
    }
    return rows;
  }, [df, selectedFeatures, targetColumn]);

  const previewColumns = useMemo(() => {
    if (previewData.length === 0) return [];
    return Object.keys(previewData[0]);
  }, [previewData]);

  const loadDefaultConfig = useCallback(async () => {
    if (!selectedDataset) return;

    // Find the dataset file name from DATASETS
    const dataset = DATASETS.find((d) => d.name === selectedDataset);
    if (!dataset) return;

    setIsLoadingConfig(true);
    try {
      const config = await loadDatasetConfig(dataset.file);
      if (config) {
        setProblemType(config.problemType);
        setTargetColumn(config.targetColumn);
        setFeatures(config.features);
      }
    } finally {
      setIsLoadingConfig(false);
    }
  }, [selectedDataset, setProblemType, setTargetColumn, setFeatures]);

  return {
    // Data state
    df,
    selectedDataset,
    columns,
    numericColumns,
    availableInteractionColumns,

    // Config state
    problemType,
    shuffle,
    testSplitPercent,
    targetColumn,
    selectedFeatures,

    // Split state
    isSplit,
    splitStats,
    canSplit,

    // Preview data
    previewData,
    previewColumns,
    numericColumnData,
    totalOutlierValues,
    removedRowsAfterOutlierDrop,
    iqrMultiplier,

    // Loading state
    isLoadingConfig,

    // Actions
    setProblemType,
    setShuffle,
    setTestSplitPercent,
    setTargetColumn,
    addFeature,
    removeFeature,
    updateFeatureTransformation,
    clearFeatures,
    performSplit,
    loadDefaultConfig,
    dropOutliers,
    setIqrMultiplier,

    // Dirty state management
    isExploreDirty,
    revertExploreChanges,
  };
}
