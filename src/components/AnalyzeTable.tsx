import { DataTable } from "@/components/ui/data-table";
import { useAnalyzeTable } from "./useAnalyzeTable";

export function AnalyzeTable() {
  const result = useAnalyzeTable();

  if (!result) return null;

  return (
    <DataTable
      columns={result.columns}
      data={result.data}
      filterColumn="column"
      filterPlaceholder="Filter columns..."
    />
  );
}
