import { DATASETS } from "./datasetsData";
import type { DatasetOption } from "./datasetTypes";
import type { CustomDataset } from "@/stores/dataset";

export function getCustomOptions(
  customDatasets: CustomDataset[],
): DatasetOption[] {
  return customDatasets.map((cd) => ({
    name: cd.name,
    problemType: cd.problemType,
    isCustom: true,
    rowCount: cd.rowCount,
    columnCount: cd.columnCount,
    fileSize: cd.fileSize,
  }));
}

export function getStandardOptions(): DatasetOption[] {
  return DATASETS.map((d) => ({
    name: d.name,
    file: d.file,
    problemType: d.problemType,
    isCustom: false,
  }));
}
