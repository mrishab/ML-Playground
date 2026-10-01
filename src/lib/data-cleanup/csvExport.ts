import Papa from "papaparse";

export function serializeToCSV(
  columns: string[],
  values: unknown[][],
): string {
  return Papa.unparse({
    fields: columns,
    data: values,
  });
}

export function downloadDataAsCSV(
  filename: string,
  columns: string[],
  values: unknown[][],
): void {
  const csv = serializeToCSV(columns, values);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const cleanName = filename.endsWith(".csv") ? filename : `${filename}.csv`;

  link.setAttribute("href", url);
  link.setAttribute("download", cleanName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
