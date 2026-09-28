import type { ProblemType, SelectedFeature } from "@/stores/mlConfig";

export interface DataSplitSettingsCardProps {
  problemType: ProblemType;
  setProblemType: (p: ProblemType) => void;
  shuffle: boolean;
  setShuffle: (s: boolean) => void;
  testSplitPercent: number;
  setTestSplitPercent: (p: number) => void;
  isSplit: boolean;
  isExploreDirty: boolean;
  canSplit: boolean;
  performSplit: () => void;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
  hasDefaultConfig?: boolean;
  isLoadingConfig?: boolean;
  loadDefaultConfig?: () => void;
}
