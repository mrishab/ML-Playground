import { useDatasetsPage } from "./useDatasetsPage";
import { DatasetsPageContent } from "./DatasetsPageContent";
import { ActionGateBar } from "@/components/pipeline/ActionGateBar";

export function DatasetsPage() {
  const p = useDatasetsPage();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <DatasetsPageContent p={p} />
      <ActionGateBar
        primaryAction={{
          label: "Explore & Clean Datasets",
          linkTo: "/data/select",
        }}
      />
    </div>
  );
}
