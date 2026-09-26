import { useDatasetLoader } from "@/hooks/useDatasetLoader";
import { useDatasetStore } from "@/stores/dataset";
import { usePipelineStore } from "@/stores/pipeline";
import { useDatasetSelect } from "./useDatasetSelect";
import { useDatasetTableData } from "./useDatasetTableData";

export function useSelectDatasetPage() {
  const { selectedDataset, df, loading, error } = useDatasetStore();
  const setSelectedDataset = useDatasetStore(
    (state) => state.setSelectedDataset,
  );
  const { pendingDataset, revertDatasetChange, setPendingDataset } =
    usePipelineStore();
  const { onSelect } = useDatasetSelect();
  useDatasetLoader();

  const handleApplyPendingDataset = () => {
    if (!pendingDataset) return;
    const newDataset = pendingDataset;
    setPendingDataset(null);
    setSelectedDataset(newDataset);
  };

  const { rows, columns } = useDatasetTableData(df);
  const isDatasetReady = Boolean(df && !loading && columns.length > 0);

  return {
    selectedDataset,
    loading,
    error,
    pendingDataset,
    revertDatasetChange,
    handleApplyPendingDataset,
    onSelect,
    rows,
    columns,
    isDatasetReady,
  };
}
