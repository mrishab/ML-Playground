import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ImputationStrategy, MissingSummary } from "@/types/dataCleanup";
import { useImputeForm } from "./useImputeForm";
import { ImputeFormFields } from "./ImputeFormFields";

interface ImputeCardProps {
  columns: string[];
  missingSummary: MissingSummary;
  onImpute: (col: string, strat: ImputationStrategy, constVal?: unknown) => void;
}

export function ImputeCard({ columns, missingSummary, onImpute }: ImputeCardProps) {
  const form = useImputeForm(missingSummary, columns, onImpute);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-primary" />
          Impute Missing Values
        </CardTitle>
        <CardDescription>Fill null cells with statistical measures or constants</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImputeFormFields
          columns={columns}
          missingSummary={missingSummary}
          selectedCol={form.selectedCol}
          onSelectCol={form.setSelectedCol}
          strategy={form.strategy}
          onStrategyChange={form.setStrategy}
          constantVal={form.constantVal}
          onConstantChange={form.setConstantVal}
        />
        <Button
          onClick={form.handleSubmit}
          disabled={!form.selectedCol || form.currentMissing === 0}
          className="w-full sm:w-auto h-9 gap-2 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <Wand2 className="h-4 w-4" />
          Impute {form.currentMissing > 0 ? `(${form.currentMissing} nulls)` : ""}
        </Button>
      </CardContent>
    </Card>
  );
}
