import { useDatasetOverview } from "./useDatasetOverview";

export function DatasetOverview() {
  const stats = useDatasetOverview();

  if (!stats) return null;

  return (
    <div className="rounded-lg border bg-card p-4 transition-[border-color,background-color,box-shadow] duration-200 ease-out shadow-sm">
      <h3 className="mb-2 text-lg font-medium">Dataset Overview</h3>
      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div className="rounded-md p-2 transition-[background-color] duration-150 ease-out hover:bg-muted/40">
          <p className="text-muted-foreground">Rows</p>
          <p className="text-2xl font-semibold">{stats.rows}</p>
        </div>
        <div className="rounded-md p-2 transition-[background-color] duration-150 ease-out hover:bg-muted/40">
          <p className="text-muted-foreground">Columns</p>
          <p className="text-2xl font-semibold">{stats.columns}</p>
        </div>
        <div className="rounded-md p-2 transition-[background-color] duration-150 ease-out hover:bg-muted/40">
          <p className="text-muted-foreground">Numeric Columns</p>
          <p className="text-2xl font-semibold">{stats.numericColumns}</p>
        </div>
        <div className="rounded-md p-2 transition-[background-color] duration-150 ease-out hover:bg-muted/40">
          <p className="text-muted-foreground">Categorical Columns</p>
          <p className="text-2xl font-semibold">{stats.categoricalColumns}</p>
        </div>
      </div>
    </div>
  );
}
