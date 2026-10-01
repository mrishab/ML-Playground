import { create } from "zustand";
import type { SavedModelsStore } from "./types";
import { getSavedModels, calculateStorageUsage } from "@/lib/models/storage";
import { createSavedModelsActions } from "./actions";

const initialModels = typeof window !== "undefined" ? getSavedModels() : [];
const { totalBytes, formattedSize } = calculateStorageUsage(initialModels);

export const useSavedModelsStore = create<SavedModelsStore>()((set, get, api) => ({
  models: initialModels,
  totalBytes,
  formattedSize,
  selectedModel: null,
  searchQuery: "",
  filterType: "all",
  sortBy: "newest",
  ...createSavedModelsActions(set, get, api),
}));

if (typeof window !== "undefined") {
  const sync = () => useSavedModelsStore.getState().loadModels();
  window.addEventListener("ml-models-storage-update", sync);
  window.addEventListener("storage", sync);
}
