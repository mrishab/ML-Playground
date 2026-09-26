"use client";

import { useDataTable } from "./data-table/useDataTable";
import { DataTableToolbar } from "./data-table/DataTableToolbar";
import { DataTableContent } from "./data-table/DataTableContent";
import { DataTablePagination } from "./data-table/DataTablePagination";
import type { DataTableProps } from "./data-table/types";

export type {
  DataTableColumnDef,
  DataTableHeaderConfig,
  DataTableProps,
} from "./data-table/types";
export { SortableHeader } from "./data-table/SortableHeader";

export function DataTable<TData>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filter...",
}: DataTableProps<TData>) {
  const { table, normalizedColumns } = useDataTable({ columns, data });

  return (
    <div className="w-full">
      <DataTableToolbar
        table={table}
        filterColumn={filterColumn}
        filterPlaceholder={filterPlaceholder}
      />
      <DataTableContent table={table} columnsCount={normalizedColumns.length} />
      <DataTablePagination table={table} />
    </div>
  );
}
