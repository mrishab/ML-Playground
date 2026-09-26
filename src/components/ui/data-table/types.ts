import type {
  ColumnDef,
  ColumnDefTemplate,
  HeaderContext,
} from "@tanstack/react-table";

export type DataTableColumnMeta = {
  title?: string;
};

export type DataTableHeaderConfig = {
  id: string;
  title: string;
  className?: string;
  sortable?: boolean;
};

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type DataTableColumnDef<TData> = DistributiveOmit<
  ColumnDef<TData, unknown>,
  "header"
> & {
  header?:
    | string
    | ColumnDefTemplate<HeaderContext<TData, unknown>>
    | DataTableHeaderConfig;
};

export function isHeaderConfig(
  header: unknown,
): header is DataTableHeaderConfig {
  return (
    typeof header === "object" &&
    header !== null &&
    "id" in header &&
    "title" in header
  );
}

export interface DataTableProps<TData> {
  columns: DataTableColumnDef<TData>[];
  data: TData[];
  filterColumn?: string;
  filterPlaceholder?: string;
}
