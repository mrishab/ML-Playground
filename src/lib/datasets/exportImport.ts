import type { SavedDataset } from "@/types/savedDataset";
import { downloadDataAsCSV } from "@/lib/data-cleanup/csvExport";

export { downloadDataAsCSV };

export function downloadDatasetAsJSON(dataset: SavedDataset): void {
  const json = JSON.stringify(dataset, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${dataset.name.replace(/[^a-zA-Z0-9_-]/g, "_")}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAllDatasetsAsJSON(datasets: SavedDataset[]): void {
  const json = JSON.stringify(datasets, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ml_playground_datasets_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseDatasetFromJSON(raw: string): SavedDataset | null {
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    if (!data.name || !Array.isArray(data.columns) || !Array.isArray(data.data)) {
      return null;
    }
    return {
      ...data,
      id: data.id || `ds_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      updatedAt: Date.now(),
      sizeBytes: new Blob([raw]).size,
    };
  } catch {
    return null;
  }
}

export function parseDatasetBundleFromJSON(raw: string): SavedDataset[] {
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data.filter(
        (item) => item && item.name && Array.isArray(item.columns) && Array.isArray(item.data),
      );
    }
    const single = parseDatasetFromJSON(raw);
    return single ? [single] : [];
  } catch {
    return [];
  }
}
