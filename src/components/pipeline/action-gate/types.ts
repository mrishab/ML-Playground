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
