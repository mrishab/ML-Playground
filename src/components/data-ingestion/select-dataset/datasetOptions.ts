import { DATASETS } from "./datasetsData";
import type { DatasetOption } from "./datasetTypes";
import type { CustomDataset } from "@/stores/dataset";
import type { SavedDataset } from "@/types/savedDataset";

export function getCustomOptions(
  customDatasets: CustomDataset[],
  savedDatasets: SavedDataset[] = [],
): DatasetOption[] {
  const seen = new Set(customDatasets.map((cd) => cd.name));
  const customOpts = customDatasets.map((cd) => ({
    name: cd.name,
    problemType: cd.problemType,
    isCustom: true,
    rowCount: cd.rowCount,
    columnCount: cd.columnCount,
    fileSize: cd.fileSize,
  }));

  const savedOpts: DatasetOption[] = [];
  for (const sd of savedDatasets) {
    if (!seen.has(sd.name)) {
      seen.add(sd.name);
      savedOpts.push({
        name: sd.name,
        isCustom: true,
        rowCount: sd.rowCount,
        columnCount: sd.columnCount,
        fileSize: sd.sizeBytes,
      });
    }
  }

  return [...customOpts, ...savedOpts];
}

export function getStandardOptions(): DatasetOption[] {
  return DATASETS.map((d) => ({
    name: d.name,
    file: d.file,
    problemType: d.problemType,
    isCustom: false,
  }));
}
