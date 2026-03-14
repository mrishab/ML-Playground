import { formatNumber } from "@/lib/number";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAnalyzeTable } from "./useAnalyzeTable";

export function AnalyzeTable() {
  const columns = useAnalyzeTable();

  if (!columns) return null;

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Column</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Count</TableHead>
            <TableHead className="text-right">Missing</TableHead>
            <TableHead className="text-right">Unique</TableHead>
            <TableHead className="text-right">Mean</TableHead>
            <TableHead className="text-right">Std</TableHead>
            <TableHead className="text-right">Min</TableHead>
            <TableHead className="text-right">Median</TableHead>
            <TableHead className="text-right">Max</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {columns.map((col) => (
            <TableRow key={col.column}>
              <TableCell className="font-medium">{col.column}</TableCell>
              <TableCell>
                <span className="rounded bg-muted px-2 py-0.5 text-xs">
                  {col.dtype}
                </span>
              </TableCell>
              <TableCell className="text-right">{col.count}</TableCell>
              <TableCell className="text-right">{col.missing}</TableCell>
              <TableCell className="text-right">{col.unique}</TableCell>
              <TableCell className="text-right">
                {formatNumber(col.mean)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(col.std)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(col.min)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(col.median)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(col.max)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
