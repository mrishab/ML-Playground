import { useEffect } from "react";
import { useRLStore } from "@/stores/rlStore";

export function useRLPage() {
  const store = useRLStore();
  const { isSimulating, stepSimulation } = store;

  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      stepSimulation();
    }, 350);
    return () => clearInterval(timer);
  }, [isSimulating, stepSimulation]);

  return store;
}
