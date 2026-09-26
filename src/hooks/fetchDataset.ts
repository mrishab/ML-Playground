import axios from "axios";
import Papa from "papaparse";
import { DataFrame } from "danfojs";
import type { RawCSVRow } from "@/types/dataset";

export async function fetchAndParseDataset(file: string): Promise<DataFrame> {
  const url = `${import.meta.env.BASE_URL}datasets/${file}`;
  const response = await axios.get<string>(url);
  const result = Papa.parse<RawCSVRow>(response.data, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    transformHeader: (header) => header.trim(),
  });

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  return new DataFrame(result.data);
}
