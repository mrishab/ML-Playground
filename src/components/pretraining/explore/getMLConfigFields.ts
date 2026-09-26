import type { MLConfigStore } from "@/stores/mlConfig/types";

export function getMLConfigFields(ml: MLConfigStore) {
  return {
    problemType: ml.problemType,
    shuffle: ml.shuffle,
    testSplitPercent: ml.testSplitPercent,
    targetColumn: ml.targetColumn,
    selectedFeatures: ml.selectedFeatures,
    isSplit: ml.isSplit,
    setProblemType: ml.setProblemType,
    setShuffle: ml.setShuffle,
    setTestSplitPercent: ml.setTestSplitPercent,
    setTargetColumn: ml.setTargetColumn,
    addFeature: ml.addFeature,
    removeFeature: ml.removeFeature,
    updateFeatureTransformation: ml.updateFeatureTransformation,
    clearFeatures: ml.clearFeatures,
  };
}
