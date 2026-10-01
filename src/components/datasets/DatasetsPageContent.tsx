import type { useDatasetsPage } from "./useDatasetsPage";
import { DatasetsPageHeader } from "./DatasetsPageHeader";
import { DatasetsStorageBanner } from "./DatasetsStorageBanner";
import { DatasetsFilterBar } from "./DatasetsFilterBar";
import { DatasetsEmptyState } from "./DatasetsEmptyState";
import { DatasetsListGrid } from "./DatasetsListGrid";
import { DatasetsDialogs } from "./DatasetsDialogs";
import { downloadDataAsCSV, downloadDatasetAsJSON, downloadAllDatasetsAsJSON } from "@/lib/datasets/exportImport";

export function DatasetsPageContent({ p }: { p: ReturnType<typeof useDatasetsPage> }) {
  const resetFilters = () => {
    p.setSearchQuery("");
    p.setFilterSource("all");
  };

  return (
    <div className="flex flex-1 flex-col gap-5 p-3.5 sm:p-5 md:p-6 pb-8 max-w-7xl mx-auto w-full">
      <DatasetsPageHeader
        datasetCount={p.datasets.length}
        onImportClick={() => p.dialogs.setIsImportOpen(true)}
        onDownloadAllClick={() => downloadAllDatasetsAsJSON(p.datasets)}
        onClearAllClick={() => p.dialogs.setIsClearOpen(true)}
      />
      <DatasetsStorageBanner formattedSize={p.formattedSize} datasets={p.datasets} />
      <DatasetsFilterBar
        searchQuery={p.searchQuery}
        onSearchChange={p.setSearchQuery}
        filterSource={p.filterSource}
        onFilterChange={p.setFilterSource}
        sortBy={p.sortBy}
        onSortChange={p.setSortBy}
      />
      {p.filteredDatasets.length === 0 ? (
        <DatasetsEmptyState isFiltered={p.datasets.length > 0} onResetFilters={resetFilters} />
      ) : (
        <DatasetsListGrid
          datasets={p.filteredDatasets}
          onLoadInPipeline={p.handleLoadInPipeline}
          onInspect={(d) => p.dialogs.setInspectDataset(d)}
          onDownloadCSV={(d) => downloadDataAsCSV(d.name, d.columns, d.data)}
          onDownloadJSON={downloadDatasetAsJSON}
          onRename={(d) => p.dialogs.setRenameDataset(d)}
          onDelete={(d) => p.dialogs.setDeleteDataset(d)}
        />
      )}
      <DatasetsDialogs page={p} />
    </div>
  );
}
