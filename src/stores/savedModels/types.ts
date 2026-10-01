import type { SavedModel } from "@/types/savedModel";

export type ModelSortOption = "newest" | "oldest" | "name" | "size";
export type ModelTypeFilter = "all" | "regression" | "classification" | "clustering";

export type SavedModelsState = {
  models: SavedModel[];
  totalBytes: number;
  formattedSize: string;
  selectedModel: SavedModel | null;
  searchQuery: string;
  filterType: ModelTypeFilter;
  sortBy: ModelSortOption;
};

export type SavedModelsActions = {
  loadModels: () => void;
  deleteModel: (id: string) => void;
  renameModel: (id: string, newName: string) => void;
  clearAll: () => void;
  importModels: (rawJson: string) => number;
  setSelectedModel: (model: SavedModel | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: ModelTypeFilter) => void;
  setSortBy: (sort: ModelSortOption) => void;
};

export type SavedModelsStore = SavedModelsState & SavedModelsActions;
