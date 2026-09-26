import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableColumnToggle } from "./DataTableColumnToggle";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn?: string;
  filterPlaceholder?: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder = "Filter...",
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center gap-2 py-4">
      {filterColumn && (
        <Input
          placeholder={filterPlaceholder}
          value={
            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn(filterColumn)?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      )}
      <DataTableColumnToggle table={table} />
    </div>
  );
}
