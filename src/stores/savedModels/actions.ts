import type { StateCreator } from "zustand";
import type { SavedModelsStore } from "./types";
import {
  getSavedModels,
  deleteModelFromStorage,
  updateModelInStorage,
  clearAllModelsFromStorage,
  saveModelToStorage,
  calculateStorageUsage,
} from "@/lib/models/storage";
import { parseImportJSON } from "@/lib/models/exportImport";

export const createSavedModelsActions: StateCreator<
  SavedModelsStore,
  [],
  [],
  Omit<SavedModelsStore, "models" | "totalBytes" | "formattedSize" | "selectedModel" | "searchQuery" | "filterType" | "sortBy">
> = (set) => ({
  loadModels: () => {
    const models = getSavedModels();
    set({ models, ...calculateStorageUsage(models) });
  },
  deleteModel: (id: string) => {
    deleteModelFromStorage(id);
    const models = getSavedModels();
    set((s) => ({
      models,
      ...calculateStorageUsage(models),
      selectedModel: s.selectedModel?.id === id ? null : s.selectedModel,
    }));
  },
  renameModel: (id: string, name: string) => {
    const updated = updateModelInStorage(id, { name });
    const models = getSavedModels();
    set((s) => ({
      models,
      ...calculateStorageUsage(models),
      selectedModel: s.selectedModel?.id === id ? updated : s.selectedModel,
    }));
  },
  clearAll: () => {
    clearAllModelsFromStorage();
    set({ models: [], totalBytes: 0, formattedSize: "0 B", selectedModel: null });
  },
  importModels: (rawJson: string) => {
    const imported = parseImportJSON(rawJson);
    imported.forEach((m) => saveModelToStorage(m));
    const models = getSavedModels();
    set({ models, ...calculateStorageUsage(models) });
    return imported.length;
  },
  setSelectedModel: (selectedModel) => set({ selectedModel }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilterType: (filterType) => set({ filterType }),
  setSortBy: (sortBy) => set({ sortBy }),
});
