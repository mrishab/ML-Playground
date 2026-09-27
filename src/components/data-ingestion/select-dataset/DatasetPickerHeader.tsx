export function DatasetPickerHeader() {
  return (
    <div>
      <p className="text-sm font-medium text-foreground">
        Select or Upload a Dataset
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Choose a built-in benchmark dataset or import your own CSV to begin your
        ML pipeline:
      </p>
    </div>
  );
}
