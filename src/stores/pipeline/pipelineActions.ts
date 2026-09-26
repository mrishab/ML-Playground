import { useDatasetStore } from "../dataset";
import { useMLConfigStore } from "../mlConfig";
import { useTrainingResultsStore } from "../trainingResults";
import type { DataFrame } from "danfojs";
import type { LastSplitConfig } from "./types";

export function handleCommitDatasetChange(name: string, df: DataFrame) {
  useDatasetStore.getState().setSelectedDataset(name);
  useDatasetStore.getState().setDf(df);
  useMLConfigStore.getState().clearSplitData();
  useMLConfigStore.getState().clearFeatures();
  useMLConfigStore.getState().setTargetColumn("");
  useTrainingResultsStore.getState().resetAll();
}

export function handleRevertExplore(lastSplitConfig: LastSplitConfig | null) {
  if (!lastSplitConfig) return;
  const ml = useMLConfigStore.getState();
  ml.setProblemType(lastSplitConfig.problemType);
  ml.setTargetColumn(lastSplitConfig.targetColumn);
  ml.setFeatures(lastSplitConfig.selectedFeatures);
  ml.setTestSplitPercent(lastSplitConfig.testSplitPercent);
  ml.setShuffle(lastSplitConfig.shuffle);
}
