import { useModelsPage } from "./useModelsPage";
import { ModelsPageContent } from "./ModelsPageContent";
import { ActionGateBar } from "@/components/pipeline/ActionGateBar";

export function ModelsPage() {
  const p = useModelsPage();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <ModelsPageContent p={p} />
      <ActionGateBar
        primaryAction={{
          label: "Start New Pipeline",
          linkTo: "/data/select",
        }}
      />
    </div>
  );
}
