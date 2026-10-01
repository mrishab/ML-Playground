import { useMemo, useCallback, useEffect } from "react";
import { useSavedModelsStore } from "@/stores/savedModels";
import { filterAndSortModels } from "./filterModels";
import { useModelDialogs } from "./useModelDialogs";
import { downloadModelJSON, downloadAllModelsBundle } from "@/lib/models/exportImport";
import { syncActiveTrainingIfUnsaved } from "@/lib/models/syncActiveTraining";
import type { SavedModel } from "@/types/savedModel";

export function useModelsPage() {
  const store = useSavedModelsStore();
  const dialogs = useModelDialogs();

  useEffect(() => { syncActiveTrainingIfUnsaved(); }, []);

  const filteredModels = useMemo(
    () => filterAndSortModels(store.models, store.searchQuery, store.filterType, store.sortBy),
    [store.models, store.searchQuery, store.filterType, store.sortBy],
  );

  const handleDownload = useCallback((model: SavedModel) => downloadModelJSON(model), []);
  const handleDownloadAll = useCallback(() => downloadAllModelsBundle(store.models), [store.models]);

  const handleDelete = useCallback((id: string) => {
    store.deleteModel(id);
    dialogs.setDeleteTarget(null);
  }, [store, dialogs]);

  const handleRename = useCallback((id: string, name: string) => {
    store.renameModel(id, name);
    dialogs.setRenameTarget(null);
  }, [store, dialogs]);

  const handleClearAll = useCallback(() => {
    store.clearAll();
    dialogs.setIsClearOpen(false);
  }, [store, dialogs]);

  return {
    models: store.models,
    filteredModels,
    formattedSize: store.formattedSize,
    totalBytes: store.totalBytes,
    searchQuery: store.searchQuery,
    setSearchQuery: store.setSearchQuery,
    filterType: store.filterType,
    setFilterType: store.setFilterType,
    sortBy: store.sortBy,
    setSortBy: store.setSortBy,
    dialogs,
    handleDownload,
    handleDownloadAll,
    handleDelete,
    handleRename,
    handleClearAll,
    handleImport: store.importModels,
  };
}
