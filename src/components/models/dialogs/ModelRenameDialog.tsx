import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SavedModel } from "@/types/savedModel";

interface RenameDialogProps {
  model: SavedModel | null;
  onClose: () => void;
  onConfirm: (id: string, newName: string) => void;
}

export function ModelRenameDialog({ model, onClose, onConfirm }: RenameDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (model) setName(model.name);
  }, [model]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model || !name.trim()) return;
    onConfirm(model.id, name.trim());
  };

  return (
    <Dialog open={Boolean(model)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Rename Model</DialogTitle>
          </DialogHeader>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter model name..."
            autoFocus
          />
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Save Name
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
