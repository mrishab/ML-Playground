import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-3 sm:py-4">
      <div className="text-xs text-muted-foreground sm:text-sm">
        {table.getFilteredRowModel().rows.length} row(s) total
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-8 text-xs sm:text-sm"
        >
          Previous
        </Button>
        <div className="text-xs text-muted-foreground whitespace-nowrap sm:text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(1, table.getPageCount())}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-8 text-xs sm:text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
