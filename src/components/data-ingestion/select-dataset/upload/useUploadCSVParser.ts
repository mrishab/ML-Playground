import { useState, useCallback } from "react";
import { parseCSVFile, type ParsedCSVResult } from "@/lib/csvUpload";

export function useUploadCSVParser() {
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedCSVResult | null>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file) return null;
    if (
      !file.name.toLowerCase().endsWith(".csv") &&
      file.type &&
      !file.type.includes("csv") &&
      !file.type.includes("text")
    ) {
      setError("Please select a valid CSV (.csv) file.");
      return null;
    }
    setIsParsing(true);
    setError(null);
    try {
      const result = await parseCSVFile(file);
      setParsed(result);
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to parse CSV file.",
      );
      setParsed(null);
      return null;
    } finally {
      setIsParsing(false);
    }
  }, []);

  const resetParser = useCallback(() => {
    setIsParsing(false);
    setError(null);
    setParsed(null);
  }, []);

  return { isParsing, error, setError, parsed, processFile, resetParser };
}
