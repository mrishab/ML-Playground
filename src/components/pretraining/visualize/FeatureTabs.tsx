import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FeatureTabItem } from "./useFeatureTabs";

type FeatureTabsProps = {
  tabs: FeatureTabItem[];
  defaultTab?: string;
};

export function FeatureTabs({ tabs, defaultTab }: FeatureTabsProps) {
  if (tabs.length === 0) {
    return null;
  }

  const defaultValue = defaultTab ?? tabs[0].id;

  return (
    <Tabs defaultValue={defaultValue} className="w-full space-y-4">
      <ScrollArea orientation="horizontal" className="w-full pb-3.5">
        <TabsList className="inline-flex w-max mb-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="min-w-[80px] sm:min-w-[120px]"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-0">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
