import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DatasetDeleteButtonProps {
  onDelete?: () => void;
}

export function DatasetDeleteButton({ onDelete }: DatasetDeleteButtonProps) {
  if (!onDelete) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="h-6 w-6 opacity-70 transition-[opacity,color,transform] duration-150 ease-out hover:opacity-100 hover:text-destructive hover:scale-110 active:scale-95 shrink-0"
      title="Remove dataset"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </Button>
  );
}
