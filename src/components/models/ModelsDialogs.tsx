import { ModelDetailsModal } from "./details/ModelDetailsModal";
import { ModelRenameDialog } from "./dialogs/ModelRenameDialog";
import { ModelDeleteConfirmDialog } from "./dialogs/ModelDeleteConfirmDialog";
import { ModelClearConfirmDialog } from "./dialogs/ModelClearConfirmDialog";
import { ModelImportDialog } from "./dialogs/ModelImportDialog";
import type { SavedModel } from "@/types/savedModel";
import type { useModelDialogs } from "./useModelDialogs";

interface DialogsProps {
  dialogs: ReturnType<typeof useModelDialogs>;
  onDownload: (model: SavedModel) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  onImport: (json: string) => number;
  modelsCount: number;
}

export function ModelsDialogs(p: DialogsProps) {
  const d = p.dialogs;
  return (
    <>
      <ModelDetailsModal
        model={d.selectedModel}
        onClose={() => d.setSelectedModel(null)}
        onDownload={p.onDownload}
      />
      <ModelRenameDialog
        model={d.renameTarget}
        onClose={() => d.setRenameTarget(null)}
        onConfirm={p.onRename}
      />
      <ModelDeleteConfirmDialog
        model={d.deleteTarget}
        onClose={() => d.setDeleteTarget(null)}
        onConfirm={p.onDelete}
      />
      <ModelClearConfirmDialog
        open={d.isClearOpen}
        onClose={() => d.setIsClearOpen(false)}
        onConfirm={p.onClear}
        count={p.modelsCount}
      />
      <ModelImportDialog
        open={d.isImportOpen}
        onClose={() => d.setIsImportOpen(false)}
        onImport={p.onImport}
      />
    </>
  );
}
