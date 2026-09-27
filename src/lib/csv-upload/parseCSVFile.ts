import Papa from "papaparse";
import type { DatasetRowData } from "@/types/dataset";
import type { ParsedCSVResult } from "./types";
import { formatFileSize } from "./formatFileSize";
import { buildParsedResult } from "./buildParsedResult";

function validateFile(file: File) {
  if (!file) throw new Error("No file provided.");
  if (file.size === 0) throw new Error("The selected file is empty (0 bytes).");
  const maxSizeBytes = 50 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(
      `File size exceeds 50MB limit (${formatFileSize(file.size)}). Please choose a smaller CSV file.`,
    );
  }
}

export function parseCSVFile(file: File): Promise<ParsedCSVResult> {
  return new Promise((resolve, reject) => {
    try {
      validateFile(file);
    } catch (err) {
      return reject(err);
    }

    Papa.parse<DatasetRowData>(file, {
      header: true,
      skipEmptyLines: "greedy",
      dynamicTyping: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        try {
          const fatal = results.errors?.find(
            (e) => e.type !== "Quotes" && e.code !== "UndetectableDelimiter",
          );
          if (fatal) {
            throw new Error(
              `CSV parsing error on row ${fatal.row ?? "?"}: ${fatal.message}`,
            );
          }
          resolve(
            buildParsedResult(results.data, results.meta.fields ?? [], file),
          );
        } catch (err) {
          reject(
            err instanceof Error
              ? err
              : new Error("Failed to process parsed CSV data."),
          );
        }
      },
      error: (err) =>
        reject(new Error(`Failed to read CSV file: ${err.message}`)),
    });
  });
}
