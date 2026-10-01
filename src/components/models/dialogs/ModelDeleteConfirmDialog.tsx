import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { SavedModel } from "@/types/savedModel";

interface DeleteDialogProps {
  model: SavedModel | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function ModelDeleteConfirmDialog({ model, onClose, onConfirm }: DeleteDialogProps) {
  if (!model) return null;

  return (
    <Dialog open={Boolean(model)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Model?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{model.name}&rdquo;? This will remove the model and its analysis from local storage.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(model.id)}
            className="active:scale-[0.98]"
          >
            Delete Model
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
