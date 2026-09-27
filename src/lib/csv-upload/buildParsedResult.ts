import type { ParsedCSVResult } from "./types";
import { sanitizeHeaders } from "./sanitizeHeaders";
import { extractRows } from "./parseRows";
import { inferProblemTypeAndTarget } from "./inferProblemType";

export function buildParsedResult(
  data: unknown[],
  rawHeaders: string[],
  file: File,
): ParsedCSVResult {
  const headers = sanitizeHeaders(rawHeaders);
  if (headers.length < 2) {
    throw new Error(
      "CSV must contain at least 2 columns (e.g., at least 1 feature and 1 target).",
    );
  }

  const { rows, missingCount } = extractRows(data, rawHeaders, headers);
  if (rows.length < 2) {
    throw new Error(
      "CSV must contain at least 2 data rows for training and validation.",
    );
  }

  const { suggestedProblemType, suggestedTarget, columnTypes } =
    inferProblemTypeAndTarget(rows, headers);

  const suggestedName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();

  return {
    fileName: file.name,
    fileSize: file.size,
    headers,
    rows,
    rowCount: rows.length,
    columnCount: headers.length,
    suggestedName: suggestedName || "Custom Dataset",
    suggestedProblemType,
    suggestedTarget,
    previewRows: rows.slice(0, 5),
    hasMissingValues: missingCount > 0,
    missingCount,
    columnTypes,
  };
}
