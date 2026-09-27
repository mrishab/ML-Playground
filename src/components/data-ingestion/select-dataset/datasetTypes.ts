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

export type DatasetPickerGridProps = {
  pendingDataset: string | null;
  onSelect: (name: string) => void;
  onOpenUpload: () => void;
  onFileDrop?: (file: File) => void;
  customDatasets?: DatasetOption[];
  onDeleteCustom?: (name: string) => void;
};
