import type { SavedDataset } from "@/types/savedDataset";
import { formatFileSize } from "@/lib/csv-upload/formatFileSize";

export function calculateDatasetStorageUsage(datasets: SavedDataset[]) {
  const raw = JSON.stringify(datasets);
  const totalBytes = new Blob([raw]).size;
  return {
    totalBytes,
    formattedSize: formatFileSize(totalBytes),
    datasetCount: datasets.length,
  };
}
