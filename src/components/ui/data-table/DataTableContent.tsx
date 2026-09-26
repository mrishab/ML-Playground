import type { Table as ReactTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";

interface DataTableContentProps<TData> {
  table: ReactTable<TData>;
  columnsCount: number;
}

export function DataTableContent<TData>({
  table,
  columnsCount,
}: DataTableContentProps<TData>) {
  return (
    <div className="rounded-md border">
      <Table>
        <DataTableHeader table={table} />
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsCount} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
