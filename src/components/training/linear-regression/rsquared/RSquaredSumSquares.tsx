import { formatNumber } from "@/lib/number";

export function RSquaredSumSquares({ rss, tss }: { rss: number; tss: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border p-3.5 transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out hover:border-primary/30 hover:bg-muted/30 hover:-translate-y-0.5 hover:shadow-sm">
        <p className="text-sm font-medium">RSS (Residual Sum of Squares)</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          Σ(yᵢ - ŷᵢ)²
        </p>
        <p className="mt-2 text-lg font-semibold">{formatNumber(rss)}</p>
      </div>
      <div className="rounded-lg border p-3.5 transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out hover:border-primary/30 hover:bg-muted/30 hover:-translate-y-0.5 hover:shadow-sm">
        <p className="text-sm font-medium">TSS (Total Sum of Squares)</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          Σ(yᵢ - ȳ)²
        </p>
        <p className="mt-2 text-lg font-semibold">{formatNumber(tss)}</p>
      </div>
    </div>
  );
}
