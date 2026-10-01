import type { SavedModel } from "@/types/savedModel";
import type { ModelSortOption, ModelTypeFilter } from "@/stores/savedModels";

export function filterAndSortModels(
  models: SavedModel[],
  searchQuery: string,
  filterType: ModelTypeFilter,
  sortBy: ModelSortOption,
): SavedModel[] {
  const query = searchQuery.trim().toLowerCase();
  const filtered = models.filter((m) => {
    if (filterType !== "all" && m.problemType !== filterType) return false;
    if (!query) return true;
    const nameMatch = m.name.toLowerCase().includes(query);
    const datasetMatch = m.datasetName.toLowerCase().includes(query);
    const algoMatch = m.algorithmName.toLowerCase().includes(query);
    const featureMatch = m.splitConfig.features.some((f) =>
      f.toLowerCase().includes(query),
    );
    return nameMatch || datasetMatch || algoMatch || featureMatch;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "oldest") return a.createdAt - b.createdAt;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "size") return b.sizeBytes - a.sizeBytes;
    return b.createdAt - a.createdAt;
  });
}
