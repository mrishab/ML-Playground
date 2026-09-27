import { Shuffle as ShuffleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { ProblemType } from "@/stores/mlConfig";
import { ProblemTypeSelect } from "./ProblemTypeSelect";
import { TargetColumnSelect } from "./TargetColumnSelect";
import { TestSplitSlider } from "./TestSplitSlider";

interface DataSplitSettingsCardProps {
  problemType: ProblemType;
  setProblemType: (p: ProblemType) => void;
  shuffle: boolean;
  setShuffle: (s: boolean) => void;
  testSplitPercent: number;
  setTestSplitPercent: (p: number) => void;
  targetColumn: string;
  setTargetColumn: (c: string) => void;
  columns: string[];
}

export function DataSplitSettingsCard({
  problemType,
  setProblemType,
  shuffle,
  setShuffle,
  testSplitPercent,
  setTestSplitPercent,
  targetColumn,
  setTargetColumn,
  columns,
}: DataSplitSettingsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Data Split Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProblemTypeSelect value={problemType} onChange={setProblemType} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShuffleIcon className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="shuffle">Shuffle data</Label>
          </div>
          <Switch id="shuffle" checked={shuffle} onCheckedChange={setShuffle} />
        </div>
        <TestSplitSlider
          value={testSplitPercent}
          onChange={setTestSplitPercent}
        />
        <TargetColumnSelect
          value={targetColumn}
          onChange={setTargetColumn}
          columns={columns}
        />
      </CardContent>
    </Card>
  );
}
