import type { SavedModel } from "@/types/savedModel";

export const STORAGE_KEY = "ml_playground_saved_models_v1";
export { calculateStorageUsage } from "./storageUsage";

export function getSavedModels(): SavedModel[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveModelToStorage(model: SavedModel): void {
  const models = getSavedModels().filter((m) => m.id !== model.id);
  models.unshift(model);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  window.dispatchEvent(new Event("ml-models-storage-update"));
}

export function deleteModelFromStorage(id: string): void {
  const models = getSavedModels().filter((m) => m.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  window.dispatchEvent(new Event("ml-models-storage-update"));
}

export function updateModelInStorage(
  id: string,
  updates: Partial<SavedModel>,
): SavedModel | null {
  const models = getSavedModels();
  const idx = models.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  const updated: SavedModel = {
    ...models[idx],
    ...updates,
    updatedAt: Date.now(),
  };
  updated.sizeBytes = new Blob([JSON.stringify(updated)]).size;
  models[idx] = updated;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  window.dispatchEvent(new Event("ml-models-storage-update"));
  return updated;
}

export function clearAllModelsFromStorage(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("ml-models-storage-update"));
}
