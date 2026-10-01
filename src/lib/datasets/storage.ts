import type { SavedDataset } from "@/types/savedDataset";

export const DATASETS_STORAGE_KEY = "ml_playground_saved_datasets_v1";
export { calculateDatasetStorageUsage } from "./storageUsage";

export function getSavedDatasets(): SavedDataset[] {
  try {
    const raw = window.localStorage.getItem(DATASETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDatasetToStorage(dataset: SavedDataset): void {
  const datasets = getSavedDatasets().filter((d) => d.id !== dataset.id);
  datasets.unshift(dataset);
  window.localStorage.setItem(DATASETS_STORAGE_KEY, JSON.stringify(datasets));
  window.dispatchEvent(new Event("ml-datasets-storage-update"));
}

export function deleteDatasetFromStorage(id: string): void {
  const datasets = getSavedDatasets().filter((d) => d.id !== id);
  window.localStorage.setItem(DATASETS_STORAGE_KEY, JSON.stringify(datasets));
  window.dispatchEvent(new Event("ml-datasets-storage-update"));
}

export function updateDatasetInStorage(
  id: string,
  updates: Partial<SavedDataset>,
): SavedDataset | null {
  const datasets = getSavedDatasets();
  const idx = datasets.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  const updated: SavedDataset = {
    ...datasets[idx],
    ...updates,
    updatedAt: Date.now(),
  };
  updated.sizeBytes = new Blob([JSON.stringify(updated)]).size;
  datasets[idx] = updated;
  window.localStorage.setItem(DATASETS_STORAGE_KEY, JSON.stringify(datasets));
  window.dispatchEvent(new Event("ml-datasets-storage-update"));
  return updated;
}

export function clearAllDatasetsFromStorage(): void {
  window.localStorage.removeItem(DATASETS_STORAGE_KEY);
  window.dispatchEvent(new Event("ml-datasets-storage-update"));
}
