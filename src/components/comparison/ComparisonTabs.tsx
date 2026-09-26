import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComparisonCard } from "@/components/comparison/ComparisonCard";

export type ComparisonAlgorithm<TMetrics> = {
  key: string;
  name: string;
  subtitle?: string;
  metrics: TMetrics | null;
  trained: boolean;
};

type ComparisonTab<TMetrics> = {
  value: string;
  label: string;
  renderContent: (metrics: TMetrics) => ReactNode;
};

type ComparisonTabsProps<TMetrics> = {
  algorithms: ComparisonAlgorithm<TMetrics>[];
  tabs: ComparisonTab<TMetrics>[];
  defaultValue: string;
};

export function ComparisonTabs<TMetrics>({
  algorithms,
  tabs,
  defaultValue,
}: ComparisonTabsProps<TMetrics>) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="grid gap-4 md:grid-cols-2">
            {algorithms.map((algorithm) => (
              <ComparisonCard
                key={algorithm.key}
                title={algorithm.name}
                subtitle={algorithm.subtitle}
                trained={algorithm.trained}
              >
                {algorithm.metrics && tab.renderContent(algorithm.metrics)}
              </ComparisonCard>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
