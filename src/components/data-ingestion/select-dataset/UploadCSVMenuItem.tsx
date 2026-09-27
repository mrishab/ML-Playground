import { Upload } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UploadCSVMenuItemProps {
  onOpenUpload?: () => void;
}

export function UploadCSVMenuItem({ onOpenUpload }: UploadCSVMenuItemProps) {
  if (!onOpenUpload) return null;

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={onOpenUpload}
        className="flex items-center gap-2 text-primary font-medium focus:text-primary"
      >
        <Upload className="h-4 w-4 shrink-0" />
        <span>Upload CSV...</span>
      </DropdownMenuItem>
    </>
  );
}
