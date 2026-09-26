import { Lock } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function PrerequisitesModalHeader({ title }: { title: string }) {
  return (
    <DialogHeader className="text-left">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
          <Lock className="h-4 w-4" />
        </div>
        <DialogTitle className="text-lg">{title} is Locked</DialogTitle>
      </div>
      <DialogDescription className="text-sm">
        Complete earlier steps to unlock this stage.
      </DialogDescription>
    </DialogHeader>
  );
}
