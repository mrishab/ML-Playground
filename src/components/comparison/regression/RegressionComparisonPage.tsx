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
      subtitle="Compare regression models"
      icon={TrendingUp}
      defaultValue="mse"
      noModelsLinkTo="/train/linear"
      nextStep={{
        message: "Comparison complete.",
        linkTo: "/validation",
        linkText: "View Validation",
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
