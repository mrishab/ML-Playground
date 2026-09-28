import { Shuffle as ShuffleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ProblemTypeSelect } from "./ProblemTypeSelect";
import { TestSplitSlider } from "./TestSplitSlider";
import { ExploreSplitButton } from "./ExploreSplitButton";
import { ExploreLoadDefaultButton } from "./ExploreLoadDefaultButton";
import type { DataSplitSettingsCardProps } from "./types";

export function DataSplitSettingsCard(props: DataSplitSettingsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Data Split Settings</CardTitle>
        {props.hasDefaultConfig && props.loadDefaultConfig && (
          <ExploreLoadDefaultButton
            isLoading={Boolean(props.isLoadingConfig)}
            onClick={props.loadDefaultConfig}
          />
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <ProblemTypeSelect
          value={props.problemType}
          onChange={props.setProblemType}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShuffleIcon className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="shuffle">Shuffle data</Label>
          </div>
          <Switch
            id="shuffle"
            checked={props.shuffle}
            onCheckedChange={props.setShuffle}
          />
        </div>
        <TestSplitSlider
          value={props.testSplitPercent}
          onChange={props.setTestSplitPercent}
        />
        <div className="pt-2">
          <ExploreSplitButton
            isSplit={props.isSplit}
            isExploreDirty={props.isExploreDirty}
            canSplit={props.canSplit}
            performSplit={props.performSplit}
            targetColumn={props.targetColumn}
            selectedFeatures={props.selectedFeatures}
          />
        </div>
      </CardContent>
    </Card>
  );
}
