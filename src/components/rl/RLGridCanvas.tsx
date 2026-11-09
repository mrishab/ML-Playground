import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RLToolBar, type EditTool } from "./RLToolBar";
import { RLGridCells } from "./RLGridCells";
import type { useRLStore } from "@/stores/rlStore";

type Props = {
  store: ReturnType<typeof useRLStore.getState>;
};

export function RLGridCanvas({ store }: Props) {
  const [tool, setTool] = useState<EditTool>("smart-obstacle");

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between pb-1">
          <CardTitle className="text-base">Environment & Policy Map</CardTitle>
          <Button
            size="sm"
            variant={store.showBFSPath ? "default" : "outline"}
            className="h-6 text-[10px] px-2"
            onClick={store.toggleShowBFSPath}
          >
            {store.showBFSPath ? "Hide BFS Path" : "Overlay BFS Path"}
          </Button>
        </div>
        <RLToolBar
          activeTool={tool}
          onSelectTool={setTool}
          onResetEnv={store.resetEnvironment}
        />
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center p-4">
        <RLGridCells store={store} tool={tool} />
      </CardContent>
    </Card>
  );
}
