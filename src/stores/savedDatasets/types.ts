import type { SavedDataset, DatasetSource } from "@/types/savedDataset";

export type DatasetSortOption = "newest" | "oldest" | "name" | "rows" | "size";
export type DatasetSourceFilter = "all" | DatasetSource;

export type SavedDatasetsState = {
  datasets: SavedDataset[];
  totalBytes: number;
  formattedSize: string;
  selectedDataset: SavedDataset | null;
  searchQuery: string;
  filterSource: DatasetSourceFilter;
  sortBy: DatasetSortOption;
};

export type SavedDatasetsActions = {
  loadDatasets: () => void;
  saveDataset: (dataset: SavedDataset) => void;
  deleteDataset: (id: string) => void;
  renameDataset: (id: string, newName: string) => void;
  updateDescription: (id: string, description: string) => void;
  clearAll: () => void;
  importDatasets: (rawJson: string) => number;
  setSelectedDataset: (dataset: SavedDataset | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterSource: (filter: DatasetSourceFilter) => void;
  setSortBy: (sort: DatasetSortOption) => void;
};

export type SavedDatasetsStore = SavedDatasetsState & SavedDatasetsActions;
