import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ClearDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export function ModelClearConfirmDialog({ open, onClose, onConfirm, count }: ClearDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Clear All Models?</DialogTitle>
          <DialogDescription>
            This action will delete all {count} saved models and their analysis from local storage. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="active:scale-[0.98]">
            Clear All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
