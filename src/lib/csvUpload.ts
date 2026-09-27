import Papa from "papaparse";
import { DataFrame } from "danfojs";
import type { ProblemType } from "@/stores/mlConfig";

export interface ParsedCSVResult {
  fileName: string;
  fileSize: number;
  headers: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  columnCount: number;
  suggestedName: string;
  suggestedProblemType: ProblemType;
  suggestedTarget: string;
  previewRows: Record<string, unknown>[];
  hasMissingValues: boolean;
  missingCount: number;
  columnTypes: Record<string, "numeric" | "text" | "boolean">;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function sanitizeHeaders(rawHeaders: string[]): string[] {
  const seen = new Map<string, number>();

  return rawHeaders.map((raw, idx) => {
    let header = (raw ?? "").trim();
    if (!header) {
      header = `Column_${idx + 1}`;
    }

    const count = seen.get(header) ?? 0;
    seen.set(header, count + 1);

    if (count > 0) {
      return `${header}_${count + 1}`;
    }
    return header;
  });
}

const COMMON_TARGET_NAMES = new Set([
  "target",
  "label",
  "class",
  "outcome",
  "y",
  "status",
  "churn",
  "survived",
  "species",
  "dependent",
]);

export function inferProblemTypeAndTarget(
  rows: Record<string, unknown>[],
  headers: string[],
): {
  suggestedProblemType: ProblemType;
  suggestedTarget: string;
  columnTypes: Record<string, "numeric" | "text" | "boolean">;
} {
  const columnTypes: Record<string, "numeric" | "text" | "boolean"> = {};

  // Analyze each column type
  for (const header of headers) {
    let numericCount = 0;
    let booleanCount = 0;
    let validCount = 0;

    for (const row of rows) {
      const val = row[header];
      if (val === null || val === undefined || val === "") continue;
      validCount++;

      if (typeof val === "boolean") {
        booleanCount++;
      } else if (typeof val === "number" && !isNaN(val)) {
        numericCount++;
      }
    }

    if (validCount === 0) {
      columnTypes[header] = "text";
    } else if (booleanCount / validCount > 0.8) {
      columnTypes[header] = "boolean";
    } else if (numericCount / validCount > 0.8) {
      columnTypes[header] = "numeric";
    } else {
      columnTypes[header] = "text";
    }
  }

  // Suggest target column:
  // 1. Look for common target names from right to left (target is almost always at the end)
  let suggestedTarget = "";
  for (let i = headers.length - 1; i >= 0; i--) {
    const header = headers[i];
    if (COMMON_TARGET_NAMES.has(header.toLowerCase())) {
      suggestedTarget = header;
      break;
    }
  }

  // 2. Default to the last column if no common name found
  if (!suggestedTarget && headers.length > 0) {
    suggestedTarget = headers[headers.length - 1];
  }

  // Suggest problem type based on target column
  let suggestedProblemType: ProblemType = "regression";
  if (suggestedTarget) {
    const targetType = columnTypes[suggestedTarget];
    if (targetType === "text" || targetType === "boolean") {
      suggestedProblemType = "classification";
    } else {
      const uniqueValues = new Set<unknown>();
      let allIntegers = true;
      let minVal = Infinity;
      let maxVal = -Infinity;

      for (const row of rows) {
        const val = row[suggestedTarget];
        if (val !== null && val !== undefined && val !== "") {
          uniqueValues.add(val);
          if (typeof val === "number") {
            if (!Number.isInteger(val)) {
              allIntegers = false;
            }
            if (val < minVal) minVal = val;
            if (val > maxVal) maxVal = val;
          }
        }
      }

      if (!allIntegers) {
        suggestedProblemType = "regression";
      } else if (
        (uniqueValues.size === 2 && (minVal === 0 || minVal === -1)) ||
        (uniqueValues.size <= 5 && minVal >= 0 && maxVal <= 10) ||
        (rows.length >= 20 &&
          uniqueValues.size <= 10 &&
          uniqueValues.size / rows.length <= 0.05)
      ) {
        suggestedProblemType = "classification";
      } else {
        suggestedProblemType = "regression";
      }
    }
  }

  return { suggestedProblemType, suggestedTarget, columnTypes };
}

export function parseCSVFile(file: File): Promise<ParsedCSVResult> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided."));
      return;
    }

    if (file.size === 0) {
      reject(new Error("The selected file is empty (0 bytes)."));
      return;
    }

    // Limit to 50MB to protect browser memory
    const maxSizeBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      reject(
        new Error(
          `File size exceeds 50MB limit (${formatFileSize(file.size)}). Please choose a smaller CSV file.`,
        ),
      );
      return;
    }

    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: "greedy",
      dynamicTyping: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        try {
          if (results.errors && results.errors.length > 0) {
            // Fatal syntax error in CSV
            const fatalError = results.errors.find(
              (e) => e.type !== "Quotes" && e.code !== "UndetectableDelimiter",
            );
            if (fatalError) {
              reject(
                new Error(
                  `CSV parsing error on row ${fatalError.row ?? "?"}: ${fatalError.message}`,
                ),
              );
              return;
            }
          }

          const rawHeaders = results.meta.fields ?? [];
          const headers = sanitizeHeaders(rawHeaders);

          if (headers.length < 2) {
            reject(
              new Error(
                "CSV must contain at least 2 columns (e.g., at least 1 feature and 1 target).",
              ),
            );
            return;
          }

          // Map rows to sanitized headers
          let missingCount = 0;
          const rows: Record<string, unknown>[] = [];

          for (const rawRow of results.data) {
            if (!rawRow || typeof rawRow !== "object") continue;

            // Check if row has any non-empty values
            let hasAnyValue = false;
            const cleanRow: Record<string, unknown> = {};

            headers.forEach((header, idx) => {
              const rawKey = rawHeaders[idx] ?? header;
              let val = rawRow[rawKey];
              if (val === undefined || val === "" || val === null) {
                val = null;
                missingCount++;
              } else {
                hasAnyValue = true;
              }
              cleanRow[header] = val;
            });

            if (hasAnyValue) {
              rows.push(cleanRow);
            }
          }

          if (rows.length < 2) {
            reject(
              new Error(
                "CSV must contain at least 2 data rows for training and validation.",
              ),
            );
            return;
          }

          const { suggestedProblemType, suggestedTarget, columnTypes } =
            inferProblemTypeAndTarget(rows, headers);

          const suggestedName = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[_-]+/g, " ")
            .trim();

          resolve({
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
          });
        } catch (err) {
          reject(
            err instanceof Error
              ? err
              : new Error("Failed to process parsed CSV data."),
          );
        }
      },
      error: (err) => {
        reject(new Error(`Failed to read CSV file: ${err.message}`));
      },
    });
  });
}

export function createDataFrameFromParsed(
  rows: Record<string, unknown>[],
  headers: string[],
): DataFrame {
  // Normalize row objects to ensure all headers are present with defined values
  const normalizedRows = rows.map((row) => {
    const item: Record<string, unknown> = {};
    for (const header of headers) {
      item[header] = row[header] ?? null;
    }
    return item;
  });

  return new DataFrame(normalizedRows);
}
