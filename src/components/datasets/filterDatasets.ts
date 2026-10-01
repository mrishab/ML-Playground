import type { SavedDataset } from "@/types/savedDataset";
import type { DatasetSortOption, DatasetSourceFilter } from "@/stores/savedDatasets";

export function filterDatasets(
  datasets: SavedDataset[],
  searchQuery: string,
  filterSource: DatasetSourceFilter,
  sortBy: DatasetSortOption,
): SavedDataset[] {
  let list = [...datasets];

  if (filterSource !== "all") {
    list = list.filter((d) => d.source === filterSource);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.columns.some((col) => col.toLowerCase().includes(q)),
    );
  }

  list.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt - a.createdAt;
      case "oldest":
        return a.createdAt - b.createdAt;
      case "name":
        return a.name.localeCompare(b.name);
      case "rows":
        return b.rowCount - a.rowCount;
      case "size":
        return b.sizeBytes - a.sizeBytes;
      default:
        return 0;
    }
  });

  return list;
}
