import { DataFrame } from "danfojs";
import type { SavedDataset } from "@/types/savedDataset";

export function createDataFrameFromSaved(dataset: SavedDataset): DataFrame {
  return new DataFrame(dataset.data, {
    columns: dataset.columns,
  });
}
