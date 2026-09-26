import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, SortableHeader } from "@/components/ui/data-table";
import type { FeatureRowData } from "@/types/dataset";

interface FeaturePreviewCardProps {
  previewColumns: string[];
  previewData: FeatureRowData[];
}

export function FeaturePreviewCard({
  previewColumns,
  previewData,
}: FeaturePreviewCardProps) {
  const tableColumns: ColumnDef<FeatureRowData>[] = useMemo(() => {
    return previewColumns.map((col) => ({
      id: col,
      accessorKey: col,
      header: ({ column }) => <SortableHeader column={column} title={col} />,
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return typeof value === "number" ? value.toFixed(4) : value;
      },
    }));
  }, [previewColumns]);

  return (
    <Card
      className={`transition-all duration-200 ${
        previewColumns.length === 0 ? "border-dashed" : ""
      }`}
    >
      {previewColumns.length > 0 && (
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Feature Preview</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {previewColumns.length > 0 ? (
          <DataTable columns={tableColumns} data={previewData} />
        ) : (
          <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
            Select features to preview data
          </div>
        )}
      </CardContent>
    </Card>
  );
}
