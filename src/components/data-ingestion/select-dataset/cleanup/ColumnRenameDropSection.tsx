import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RenameDropProps {
  columns: string[];
  selectedCol: string;
  onSelectCol: (col: string) => void;
  newName: string;
  onNewNameChange: (val: string) => void;
  onRename: () => void;
  onDrop: () => void;
}

export function ColumnRenameDropSection({
  columns,
  selectedCol,
  onSelectCol,
  newName,
  onNewNameChange,
  onRename,
  onDrop,
}: RenameDropProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-card/40">
      <h4 className="text-xs font-semibold text-foreground">Rename or Drop Column</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Select value={selectedCol} onValueChange={onSelectCol}>
          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Column" /></SelectTrigger>
          <SelectContent>{columns.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <Input className="h-8 text-xs" placeholder="New column name..." value={newName} onChange={(e) => onNewNameChange(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={onRename} disabled={!newName.trim()} className="flex-1 h-7 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
          <Edit2 className="h-3 w-3 mr-1" /> Rename
        </Button>
        <Button size="sm" variant="outline" onClick={onDrop} disabled={columns.length <= 1} className="h-7 text-xs text-destructive hover:bg-destructive/10 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
          <Trash2 className="h-3 w-3 mr-1" /> Drop
        </Button>
      </div>
    </div>
  );
}
