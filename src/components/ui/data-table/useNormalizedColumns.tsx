import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "./SortableHeader";
import { type DataTableColumnDef, isHeaderConfig } from "./types";

export function useNormalizedColumns<TData>(
  columns: DataTableColumnDef<TData>[],
) {
  return useMemo<ColumnDef<TData, unknown>[]>(() => {
    return columns.map((columnDef) => {
      const header = columnDef.header;
      if (!isHeaderConfig(header)) {
        return columnDef as ColumnDef<TData, unknown>;
      }

      const sortable = header.sortable ?? columnDef.enableSorting ?? true;

      return {
        ...columnDef,
        id: columnDef.id ?? header.id,
        enableSorting: columnDef.enableSorting ?? sortable,
        meta: {
          ...(columnDef.meta as Record<string, unknown> | undefined),
          title: header.title,
        },
        header: ({ column }) => (
          <div className={header.className}>
            {sortable ? (
              <SortableHeader column={column} title={header.title} />
            ) : (
              <span>{header.title}</span>
            )}
          </div>
        ),
      };
    });
  }, [columns]);
}
