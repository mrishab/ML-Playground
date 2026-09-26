import { Button } from "@/components/ui/button";
import type { ActionGateChecklistItem } from "./types";
import { ActionGateDrawerItem } from "./ActionGateDrawerItem";

interface ActionGateDrawerProps {
  title: string;
  checklist: ActionGateChecklistItem[];
  onClose: () => void;
}

export function ActionGateDrawer({
  title,
  checklist,
  onClose,
}: ActionGateDrawerProps) {
  return (
    <div className="border-b bg-muted/40 p-4 animate-in slide-in-from-bottom-2 duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title} Requirements
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 pt-2">
          {checklist.map((item) => (
            <ActionGateDrawerItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
