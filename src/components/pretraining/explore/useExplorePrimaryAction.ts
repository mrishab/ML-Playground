import { useMemo } from "react";

interface PrimaryActionParams {
  isSplit: boolean;
  isExploreDirty: boolean;
  canSplit: boolean;
  performSplit: () => void;
  defaultTrainRoute: string;
}

export function useExplorePrimaryAction({
  isSplit,
  isExploreDirty,
  canSplit,
  performSplit,
  defaultTrainRoute,
}: PrimaryActionParams) {
  return useMemo(() => {
    if (!isSplit) {
      return {
        label: "Create Train/Test Split",
        onClick: performSplit,
        disabled: !canSplit,
        disabledReason: !canSplit
          ? "Select target variable and at least 1 feature"
          : undefined,
      };
    }

    if (isExploreDirty) {
      return {
        label: "Re-split Data",
        onClick: performSplit,
        disabled: !canSplit,
        variant: "destructive" as const,
      };
    }

    return {
      label: "Proceed to Model Training",
      linkTo: defaultTrainRoute,
    };
  }, [isSplit, isExploreDirty, canSplit, performSplit, defaultTrainRoute]);
}
