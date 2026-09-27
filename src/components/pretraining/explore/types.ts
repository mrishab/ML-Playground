import type { ProblemType } from "@/stores/mlConfig";

export interface DataSplitSettingsCardProps {
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
