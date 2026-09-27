export type ActionGatePrimaryAction = {
  label: string;
  onClick?: () => void;
  linkTo?: string;
  disabled?: boolean;
  disabledReason?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  loading?: boolean;
};

export type ActionGateChecklistItem = {
  label: string;
  satisfied: boolean;
  missingText?: string;
};

export type ActionGateProps = {
  primaryAction?: ActionGatePrimaryAction;
  customChecklist?: ActionGateChecklistItem[];
};

export type ActionGateChecklistButtonProps = {
  satisfiedCount: number;
  totalCount: number;
  allSatisfied: boolean;
  missingItems: ActionGateChecklistItem[];
  isOpen: boolean;
  onToggle: () => void;
  completedSteps: number;
  totalSteps: number;
  currentStepId: number;
};
