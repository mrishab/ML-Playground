import type { SavedDataset } from "@/types/savedDataset";
import { createDataFrameFromSaved } from "./dataFrameFromSaved";
import { useDatasetStore } from "@/stores/dataset";

export function loadSavedDatasetIntoPipeline(dataset: SavedDataset): void {
  const df = createDataFrameFromSaved(dataset);
  const store = useDatasetStore.getState();

  store.addCustomDataset({
    name: dataset.name,
    fileName: `${dataset.name}.csv`,
    fileSize: dataset.sizeBytes,
    rowCount: dataset.rowCount,
    columnCount: dataset.columnCount,
    columns: dataset.columns,
    df,
    uploadedAt: dataset.createdAt,
  });

  store.setSelectedDataset(dataset.name);
  store.setDf(df);
}
