import { SlidersHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnRenameDropSection } from "./ColumnRenameDropSection";
import { ColumnCastReplaceSection } from "./ColumnCastReplaceSection";
import { useColumnOpsForm } from "./useColumnOpsForm";

interface ColumnOpsCardProps {
  columns: string[];
  onRename: (oldName: string, newName: string) => void;
  onDropCol: (col: string) => void;
  onCast: (col: string, type: "numeric" | "string" | "boolean") => void;
  onReplace: (col: string, findVal: string, replaceVal: string) => void;
}

export function ColumnOpsCard({ columns, onRename, onDropCol, onCast, onReplace }: ColumnOpsCardProps) {
  const form = useColumnOpsForm(columns);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Column Operations
        </CardTitle>
        <CardDescription>Rename, drop, type-convert, or substitute column values</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColumnRenameDropSection
          columns={columns}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          newName={form.newName}
          onNewNameChange={form.setNewName}
          onRename={() => form.selectedCol && form.newName && onRename(form.selectedCol, form.newName)}
          onDrop={() => form.selectedCol && onDropCol(form.selectedCol)}
        />
        <ColumnCastReplaceSection
          columns={columns}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          targetType={form.targetType}
          onTargetTypeChange={form.setTargetType}
          findVal={form.findVal}
          onFindChange={form.setFindVal}
          replaceVal={form.replaceVal}
          onReplaceChange={form.setReplaceVal}
          onCast={() => form.selectedCol && onCast(form.selectedCol, form.targetType)}
          onReplace={() => form.selectedCol && onReplace(form.selectedCol, form.findVal, form.replaceVal)}
        />
      </CardContent>
    </Card>
  );
}
