import type { SavedModel } from "@/types/savedModel";
import { formatFileSize } from "@/lib/csv-upload/formatFileSize";

export function calculateStorageUsage(models: SavedModel[]) {
  const raw = JSON.stringify(models);
  const totalBytes = new Blob([raw]).size;
  return {
    totalBytes,
    formattedSize: formatFileSize(totalBytes),
    modelCount: models.length,
  };
}
