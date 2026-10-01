import { DatasetInspectModal } from "./details/DatasetInspectModal";
import { DatasetRenameDialog } from "./dialogs/DatasetRenameDialog";
import { DatasetDeleteConfirmDialog } from "./dialogs/DatasetDeleteConfirmDialog";
import { DatasetClearConfirmDialog } from "./dialogs/DatasetClearConfirmDialog";
import { DatasetImportDialog } from "./dialogs/DatasetImportDialog";
import type { useDatasetsPage } from "./useDatasetsPage";
import { downloadDataAsCSV } from "@/lib/data-cleanup/csvExport";
import type { SavedDataset } from "@/types/savedDataset";

interface DialogsProps {
  page: ReturnType<typeof useDatasetsPage>;
}

export function DatasetsDialogs({ page }: DialogsProps) {
  const { dialogs, renameDataset, deleteDataset, clearAll, importDatasets, datasets, handleLoadInPipeline } = page;

  return (
    <>
      <DatasetInspectModal
        dataset={dialogs.inspectDataset}
        onClose={() => dialogs.setInspectDataset(null)}
        onLoadInPipeline={handleLoadInPipeline}
        onDownloadCSV={(d: SavedDataset) => downloadDataAsCSV(d.name, d.columns, d.data)}
      />
      <DatasetRenameDialog
        dataset={dialogs.renameDataset}
        onClose={() => dialogs.setRenameDataset(null)}
        onConfirm={(id, name) => { renameDataset(id, name); dialogs.setRenameDataset(null); }}
      />
      <DatasetDeleteConfirmDialog
        dataset={dialogs.deleteDataset}
        onClose={() => dialogs.setDeleteDataset(null)}
        onConfirm={(id) => { deleteDataset(id); dialogs.setDeleteDataset(null); }}
      />
      <DatasetClearConfirmDialog
        open={dialogs.isClearOpen}
        onClose={() => dialogs.setIsClearOpen(false)}
        onConfirm={() => { clearAll(); dialogs.setIsClearOpen(false); }}
        count={datasets.length}
      />
      <DatasetImportDialog
        open={dialogs.isImportOpen}
        onClose={() => dialogs.setIsImportOpen(false)}
        onImport={importDatasets}
      />
    </>
  );
}
