import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SavedDataset } from "@/types/savedDataset";

interface RenameDialogProps {
  dataset: SavedDataset | null;
  onClose: () => void;
  onConfirm: (id: string, newName: string) => void;
}

export function DatasetRenameDialog({ dataset, onClose, onConfirm }: RenameDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (dataset) setName(dataset.name);
  }, [dataset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataset || !name.trim()) return;
    onConfirm(dataset.id, name.trim());
  };

  return (
    <Dialog open={Boolean(dataset)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Rename Dataset</DialogTitle>
          </DialogHeader>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter dataset name..."
            autoFocus
          />
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!name.trim()}>Save Name</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
