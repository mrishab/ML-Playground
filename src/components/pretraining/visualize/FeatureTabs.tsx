import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
    <Tabs defaultValue={defaultValue} className="w-full">
      <ScrollArea className="w-full">
        <TabsList className="inline-flex w-max">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="min-w-[120px]">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
