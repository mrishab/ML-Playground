import { useState } from "react";
import { useDatasetLoader } from "@/hooks/useDatasetLoader";
import { useDatasetStore } from "@/stores/dataset";
import { usePipelineStore } from "@/stores/pipeline";
import { useDatasetSelect } from "./useDatasetSelect";
import { useDatasetTableData } from "./useDatasetTableData";

export function useSelectDatasetPage() {
  const selectedDataset = useDatasetStore((s) => s.selectedDataset);
  const df = useDatasetStore((s) => s.df);
  const loading = useDatasetStore((s) => s.loading);
  const error = useDatasetStore((s) => s.error);
  const setSelectedDataset = useDatasetStore(
    (state) => state.setSelectedDataset,
  );
  const { pendingDataset, revertDatasetChange, setPendingDataset } =
    usePipelineStore();
  const { onSelect, customDatasets, onDeleteCustom } = useDatasetSelect();
  useDatasetLoader();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
    customDatasets,
    onDeleteCustom,
    rows,
    columns,
    isDatasetReady,
    isUploadModalOpen,
    setIsUploadModalOpen,
  };
}
