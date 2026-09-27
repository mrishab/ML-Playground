import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { usePipelineStore } from "@/stores/pipeline";

export function useCSVImportStores() {
  const addCustomDataset = useDatasetStore((s) => s.addCustomDataset);
  const setStoreProblemType = useMLConfigStore((s) => s.setProblemType);
  const setStoreTargetColumn = useMLConfigStore((s) => s.setTargetColumn);
  const resetMLConfig = useMLConfigStore((s) => s.reset);
  const setPendingDataset = usePipelineStore((s) => s.setPendingDataset);

  return {
    addCustomDataset,
    setStoreProblemType,
    setStoreTargetColumn,
    resetMLConfig,
    setPendingDataset,
  };
}
