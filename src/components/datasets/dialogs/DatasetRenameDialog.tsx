import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SavedDataset } from "@/types/savedDataset";

interface RenameDialogProps {
  dataset: SavedDataset | null;
  onClose: () => void;
  onConfirm: (id: string, newName: string) => void;
}

function RenameDatasetForm({ dataset, onClose, onConfirm }: {
  dataset: SavedDataset;
  onClose: () => void;
  onConfirm: (id: string, newName: string) => void;
}) {
  const [name, setName] = useState(dataset.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm(dataset.id, name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Rename Dataset</DialogTitle>
      </DialogHeader>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter dataset name..." />
      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={!name.trim()}>Save Name</Button>
      </DialogFooter>
    </form>
  );
}

export function DatasetRenameDialog({ dataset, onClose, onConfirm }: RenameDialogProps) {
  return (
    <Dialog open={Boolean(dataset)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {dataset && <RenameDatasetForm key={dataset.id} dataset={dataset} onClose={onClose} onConfirm={onConfirm} />}
      </DialogContent>
    </Dialog>
  );
}
