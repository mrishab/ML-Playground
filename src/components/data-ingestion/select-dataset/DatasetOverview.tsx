import { useDatasetOverview } from "./useDatasetOverview";

export function DatasetOverview() {
  const stats = useDatasetOverview();

  if (!stats) return null;

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-2 text-lg font-medium">Dataset Overview</h3>
      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <p className="text-muted-foreground">Rows</p>
          <p className="text-2xl font-semibold">{stats.rows}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Columns</p>
          <p className="text-2xl font-semibold">{stats.columns}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Numeric Columns</p>
          <p className="text-2xl font-semibold">{stats.numericColumns}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Categorical Columns</p>
          <p className="text-2xl font-semibold">{stats.categoricalColumns}</p>
        </div>
      </div>
    </div>
  );
}
