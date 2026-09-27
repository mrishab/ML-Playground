import {
  createDataFrameFromParsed,
  type ParsedCSVResult,
} from "@/lib/csvUpload";
import type { ProblemType } from "@/stores/mlConfig";
import type { useCSVImportStores } from "./useCSVImportStores";

interface SaveParams {
  name: string;
  problemType: ProblemType;
  targetColumn: string;
  parsed: ParsedCSVResult;
}

export function executeCSVImport(
  params: SaveParams,
  stores: ReturnType<typeof useCSVImportStores>,
) {
  const df = createDataFrameFromParsed(
    params.parsed.rows,
    params.parsed.headers,
  );
  stores.addCustomDataset({
    name: params.name,
    fileName: params.parsed.fileName,
    fileSize: params.parsed.fileSize,
    problemType: params.problemType,
    targetColumn: params.targetColumn,
    rowCount: params.parsed.rowCount,
    columnCount: params.parsed.columnCount,
    columns: params.parsed.headers,
    df,
    uploadedAt: Date.now(),
  });
  stores.resetMLConfig();
  stores.setStoreProblemType(params.problemType);
  stores.setStoreTargetColumn(params.targetColumn);
  stores.setPendingDataset(null);
}
