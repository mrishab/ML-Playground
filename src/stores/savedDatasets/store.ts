import { create } from "zustand";
import type { SavedDatasetsStore } from "./types";
import {
  getSavedDatasets,
  calculateDatasetStorageUsage,
} from "@/lib/datasets/storage";
import { createSavedDatasetsActions } from "./actions";

const initialDatasets =
  typeof window !== "undefined" ? getSavedDatasets() : [];
const { totalBytes, formattedSize } =
  calculateDatasetStorageUsage(initialDatasets);

export const useSavedDatasetsStore = create<SavedDatasetsStore>()(
  (set, get, api) => ({
    datasets: initialDatasets,
    totalBytes,
    formattedSize,
    selectedDataset: null,
    searchQuery: "",
    filterSource: "all",
    sortBy: "newest",
    ...createSavedDatasetsActions(set, get, api),
  }),
);

if (typeof window !== "undefined") {
  const sync = () => useSavedDatasetsStore.getState().loadDatasets();
  window.addEventListener("ml-datasets-storage-update", sync);
  window.addEventListener("storage", sync);
}
