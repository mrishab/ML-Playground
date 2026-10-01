import type { DatasetSource, SavedDataset, ColumnDtypeMap } from "@/types/savedDataset";
import type { CleanupHistoryEntry } from "@/types/dataCleanup";
import { isMissingValue } from "@/lib/data-cleanup/missingCheck";
import { countDuplicateRows } from "@/lib/data-cleanup/duplicateOps";

export interface BuildDatasetParams {
  name: string;
  columns: string[];
  values: unknown[][];
  description?: string;
  source?: DatasetSource;
  originalDatasetName?: string;
  history?: CleanupHistoryEntry[];
  dtypes?: ColumnDtypeMap;
}

export function inferDtypes(
  columns: string[],
  values: unknown[][],
): ColumnDtypeMap {
  const result: ColumnDtypeMap = {};
  for (let c = 0; c < columns.length; c++) {
    let dtype = "string";
    for (let r = 0; r < Math.min(values.length, 50); r++) {
      const v = values[r]?.[c];
      if (!isMissingValue(v)) {
        if (typeof v === "number" || (!isNaN(Number(v)) && typeof v !== "boolean")) {
          dtype = "number";
        } else if (typeof v === "boolean" || v === "true" || v === "false") {
          dtype = "boolean";
        } else {
          dtype = "string";
        }
        break;
      }
    }
    result[columns[c]] = dtype;
  }
  return result;
}

export function buildSavedDataset(params: BuildDatasetParams): SavedDataset {
  const { name, columns, values, description, source = "cleaned", originalDatasetName, history = [] } = params;
  const dtypes = params.dtypes || inferDtypes(columns, values);

  let nullCount = 0;
  for (let r = 0; r < values.length; r++) {
    for (let c = 0; c < columns.length; c++) {
      if (isMissingValue(values[r]?.[c])) nullCount++;
    }
  }

  const numericCols = Object.values(dtypes).filter((d) => d === "number" || d === "float32" || d === "int32").length;
  const duplicateCount = countDuplicateRows(values);

  const dataset: SavedDataset = {
    id: `ds_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim() || `Dataset_${Date.now()}`,
    description: description?.trim() || "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    source,
    originalDatasetName: originalDatasetName || name,
    rowCount: values.length,
    columnCount: columns.length,
    columns,
    dtypes,
    data: values as (string | number | boolean | null)[][],
    summary: {
      numericColumns: numericCols,
      categoricalColumns: columns.length - numericCols,
      nullCount,
      duplicateRows: duplicateCount,
    },
    history,
    sizeBytes: 0,
  };

  dataset.sizeBytes = new Blob([JSON.stringify(dataset)]).size;
  return dataset;
}
