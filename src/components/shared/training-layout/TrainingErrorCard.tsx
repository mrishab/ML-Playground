import { Card, CardContent } from "@/components/ui/card";

export function TrainingErrorCard({ error }: { error?: string | null }) {
  if (!error) return null;
  return (
    <Card className="border-red-500/30 bg-red-500/5">
      <CardContent className="p-4">
        <p className="text-sm text-red-500">{error}</p>
      </CardContent>
    </Card>
  );
}
