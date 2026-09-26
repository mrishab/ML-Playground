import { Lock } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PrerequisiteGateHeader({ title }: { title: string }) {
  return (
    <CardHeader className="text-center pb-4">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-2">
        <Lock className="h-6 w-6" />
      </div>
      <CardTitle className="text-xl font-bold">{title} is Locked</CardTitle>
      <CardDescription className="text-sm">
        Complete the requirements below to unlock this stage.
      </CardDescription>
    </CardHeader>
  );
}
