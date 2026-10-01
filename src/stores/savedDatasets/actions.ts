import type { StateCreator } from "zustand";
import type { SavedDatasetsStore } from "./types";
import type { SavedDataset } from "@/types/savedDataset";
import {
  getSavedDatasets,
  deleteDatasetFromStorage,
  updateDatasetInStorage,
  clearAllDatasetsFromStorage,
  saveDatasetToStorage,
  calculateDatasetStorageUsage,
} from "@/lib/datasets/storage";
import { parseDatasetBundleFromJSON } from "@/lib/datasets/exportImport";

export const createSavedDatasetsActions: StateCreator<
  SavedDatasetsStore,
  [],
  [],
  Omit<
    SavedDatasetsStore,
    "datasets" | "totalBytes" | "formattedSize" | "selectedDataset" | "searchQuery" | "filterSource" | "sortBy"
  >
> = (set) => ({
  loadDatasets: () => {
    const datasets = getSavedDatasets();
    set({ datasets, ...calculateDatasetStorageUsage(datasets) });
  },
  saveDataset: (dataset: SavedDataset) => {
    saveDatasetToStorage(dataset);
    const datasets = getSavedDatasets();
    set({ datasets, ...calculateDatasetStorageUsage(datasets) });
  },
  deleteDataset: (id: string) => {
    deleteDatasetFromStorage(id);
    const datasets = getSavedDatasets();
    set((s) => ({
      datasets,
      ...calculateDatasetStorageUsage(datasets),
      selectedDataset: s.selectedDataset?.id === id ? null : s.selectedDataset,
    }));
  },
  renameDataset: (id: string, name: string) => {
    const updated = updateDatasetInStorage(id, { name });
    const datasets = getSavedDatasets();
    set((s) => ({
      datasets,
      ...calculateDatasetStorageUsage(datasets),
      selectedDataset: s.selectedDataset?.id === id ? updated : s.selectedDataset,
    }));
  },
  updateDescription: (id: string, description: string) => {
    const updated = updateDatasetInStorage(id, { description });
    const datasets = getSavedDatasets();
    set((s) => ({
      datasets,
      ...calculateDatasetStorageUsage(datasets),
      selectedDataset: s.selectedDataset?.id === id ? updated : s.selectedDataset,
    }));
  },
  clearAll: () => {
    clearAllDatasetsFromStorage();
    set({ datasets: [], totalBytes: 0, formattedSize: "0 B", selectedDataset: null });
  },
  importDatasets: (rawJson: string) => {
    const imported = parseDatasetBundleFromJSON(rawJson);
    imported.forEach((d) => saveDatasetToStorage(d));
    const datasets = getSavedDatasets();
    set({ datasets, ...calculateDatasetStorageUsage(datasets) });
    return imported.length;
  },
  setSelectedDataset: (selectedDataset) => set({ selectedDataset }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilterSource: (filterSource) => set({ filterSource }),
  setSortBy: (sortBy) => set({ sortBy }),
});
