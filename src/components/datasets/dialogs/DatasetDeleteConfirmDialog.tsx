import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { SavedDataset } from "@/types/savedDataset";

interface DeleteDialogProps {
  dataset: SavedDataset | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function DatasetDeleteConfirmDialog({ dataset, onClose, onConfirm }: DeleteDialogProps) {
  if (!dataset) return null;

  return (
    <Dialog open={Boolean(dataset)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Dataset?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{dataset.name}&rdquo;? This will remove the dataset and its cached transformations from local storage.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(dataset.id)}
            className="active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out"
          >
            Delete Dataset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
