import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  onLockedClick?: () => void;
  items?: NavItem[];
};
