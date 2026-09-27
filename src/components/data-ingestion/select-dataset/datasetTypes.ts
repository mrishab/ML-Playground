export type DatasetOption = {
  name: string;
  file?: string;
  problemType?: string;
  isCustom?: boolean;
  rowCount?: number;
  columnCount?: number;
  fileSize?: number;
};

export type DatasetCardProps = {
  name: string;
  problemType?: string;
  selected: boolean;
  onSelect: () => void;
  isCustom?: boolean;
  rowCount?: number;
  columnCount?: number;
  onDelete?: () => void;
};
