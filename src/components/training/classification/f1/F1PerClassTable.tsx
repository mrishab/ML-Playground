import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/number";
import type { PerClassMetrics } from "@/types/classification";

export function F1PerClassTable({ perClass }: { perClass: PerClassMetrics[] }) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead className="text-right">Precision</TableHead>
            <TableHead className="text-right">Recall</TableHead>
            <TableHead className="text-right">F1-Score</TableHead>
            <TableHead className="text-right">Support</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {perClass.map((cls) => (
            <TableRow key={cls.label}>
              <TableCell className="font-medium">{cls.label}</TableCell>
              <TableCell className="text-right">
                {formatNumber(cls.precision)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(cls.recall)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatNumber(cls.f1Score)}
              </TableCell>
              <TableCell className="text-right">{cls.support}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
