import { useState, useEffect, useMemo } from "react";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import Papa from "papaparse";
import { DatasetSelect, DATASETS } from "@/components/DatasetSelect";
import { DataTable, SortableHeader } from "@/components/ui/data-table";

type CSVRow = Record<string, string>;

type CSVData = {
  headers: string[];
  rows: CSVRow[];
};

export function SelectDatasetPage() {
  const [selectedDataset, setSelectedDataset] = useState<string>("");
  const [data, setData] = useState<CSVData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDataset) {
      setData(null);
      return;
    }

    const dataset = DATASETS.find((d) => d.name === selectedDataset);
    if (!dataset) return;

    const loadDataset = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<string>(`/datasets/${dataset.file}`);
        const result = Papa.parse<CSVRow>(response.data, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
        });

        if (result.errors.length > 0) {
          throw new Error(result.errors[0].message);
        }

        setData({
          headers: result.meta.fields ?? [],
          rows: result.data,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load dataset";
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadDataset();
  }, [selectedDataset]);

  const columns = useMemo<ColumnDef<CSVRow>[]>(() => {
    if (!data) return [];
    return data.headers.map((header) => ({
      accessorKey: header,
      header: ({ column }) => <SortableHeader column={column} title={header} />,
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.getValue(header)}</div>
      ),
    }));
  }, [data]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold">Select Dataset</h1>
          <p className="text-sm text-muted-foreground">
            Choose a dataset from the available CSV files
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <DatasetSelect value={selectedDataset} onChange={setSelectedDataset} />
      </div>

      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {data && !loading && (
        <DataTable
          columns={columns}
          data={data.rows}
        />
      )}

      {!selectedDataset && !loading && (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
          <p className="text-muted-foreground">
            Select a dataset to view its contents
          </p>
        </div>
      )}
    </div>
  );
}
