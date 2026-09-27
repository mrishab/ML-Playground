import { Binary, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { ProblemType } from "@/stores/mlConfig";
import { ProblemTypeCard } from "./ProblemTypeCard";

interface UploadCSVProblemTypeProps {
  problemType: ProblemType;
  setProblemType: (type: ProblemType) => void;
}

export function UploadCSVProblemType({
  problemType,
  setProblemType,
}: UploadCSVProblemTypeProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs sm:text-sm font-medium">Problem Type</Label>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <ProblemTypeCard
          isSelected={problemType === "classification"}
          onClick={() => setProblemType("classification")}
          icon={Binary}
          title="Classification"
          description="Categorical or discrete class labels (e.g. KNN, LDA, Logistic)"
        />
        <ProblemTypeCard
          isSelected={problemType === "regression"}
          onClick={() => setProblemType("regression")}
          icon={TrendingUp}
          title="Regression"
          description="Continuous numerical values (e.g. Linear Regression)"
        />
      </div>
    </div>
  );
}
