import { useCallback, useMemo, useState } from "react";
import * as dfd from "danfojs";
import type { DataFrame } from "danfojs";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore, type SelectedFeature } from "@/stores/mlConfig";
import { loadDatasetConfig } from "@/lib/datasetConfig";
import { DATASETS } from "@/components/useDatasetSelect";

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

export function useExplorePage() {
  const { df, selectedDataset } = useDatasetStore();
  const {
    problemType,
    shuffle,
    testSplitPercent,
    targetColumn,
    selectedFeatures,
    xTrain,
    xTest,
    yTrain,
    yTest,
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
  } = useMLConfigStore();

  const [isLoadingConfig, setIsLoadingConfig] = useState(false);

  const columns = useMemo(() => {
    if (!df) return [];
    return df.columns as string[];
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

    const nRows = df.shape[0];
    let indices = Array.from({ length: nRows }, (_, i) => i);

    if (shuffle) {
      indices = shuffleArray(indices);
    }

    const testSize = Math.floor(nRows * (testSplitPercent / 100));
    const trainSize = nRows - testSize;

    const trainIndices = indices.slice(0, trainSize);
    const testIndices = indices.slice(trainSize);

    // Build feature columns with transformations
    const featureData: { [key: string]: number[] } = {};

    for (const feature of selectedFeatures) {
      const { column, name } = applyTransformation(df, feature);
      // Handle duplicate names by appending index
      let finalName = name;
      let counter = 1;
      while (finalName in featureData) {
        finalName = `${name}_${counter}`;
        counter++;
      }
      featureData[finalName] = column;
    }

    // Get y values
    const yFull = df.column(targetColumn);

    // Split into train/test
    const xTrainData: { [key: string]: number[] } = {};
    const xTestData: { [key: string]: number[] } = {};

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
  }, [
    df,
    canSplit,
    shuffle,
    testSplitPercent,
    selectedFeatures,
    targetColumn,
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

    const featureData: Record<string, number[]> = {};

    for (const feature of selectedFeatures) {
      const { column, name } = applyTransformation(df, feature);
      let finalName = name;
      let counter = 1;
      while (finalName in featureData) {
        finalName = `${name}_${counter}`;
        counter++;
      }
      featureData[finalName] = column;
    }

    // Add target column if selected
    if (targetColumn) {
      const targetValues = df.column(targetColumn).values as number[];
      featureData[`[Y] ${targetColumn}`] = targetValues;
    }

    const nRows = df.shape[0];
    const rows: Record<string, number>[] = [];
    for (let i = 0; i < nRows; i++) {
      const row: Record<string, number> = {};
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
    xTrain,
    xTest,
    yTrain,
    yTest,
    isSplit,
    splitStats,
    canSplit,

    // Preview data
    previewData,
    previewColumns,

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
  };
}
