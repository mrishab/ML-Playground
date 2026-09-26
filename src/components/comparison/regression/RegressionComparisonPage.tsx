import { TrendingUp } from "lucide-react";
import { ComparisonPageLayout } from "../ComparisonPageLayout";
import { useRegressionComparison } from "./useRegressionComparison";
import { MSEContent } from "./MSEContent";
import { RSEContent } from "./RSEContent";
import { RSquaredContent } from "./RSquaredContent";

export function RegressionComparisonPage() {
  const pageState = useRegressionComparison();

  return (
    <ComparisonPageLayout
      {...pageState}
      title="Regression Comparison"
      subtitle="Compare regression algorithms side by side"
      icon={TrendingUp}
      defaultValue="mse"
      noModelsLinkTo="/train/linear"
      nextStep={{
        message:
          "Analysis complete. Start a new pipeline with a different dataset.",
        linkTo: "/data/select",
        linkText: "Start Over",
      }}
      tabs={[
        {
          value: "mse",
          label: "MSE",
          renderContent: (metrics) => <MSEContent metrics={metrics} />,
        },
        {
          value: "rse",
          label: "RSE",
          renderContent: (metrics) => <RSEContent metrics={metrics} />,
        },
        {
          value: "rsquared",
          label: "R²",
          renderContent: (metrics) => <RSquaredContent metrics={metrics} />,
        },
      ]}
    />
  );
}
