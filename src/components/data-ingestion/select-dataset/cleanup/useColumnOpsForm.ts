import { useState } from "react";

export function useColumnOpsForm(columns: string[]) {
  const [selectedCol, setSelectedCol] = useState<string>(columns[0] || "");
  const [newName, setNewName] = useState<string>("");
  const [targetType, setTargetType] = useState<"numeric" | "string" | "boolean">("numeric");
  const [findVal, setFindVal] = useState<string>("");
  const [replaceVal, setReplaceVal] = useState<string>("");

  return {
    selectedCol,
    setSelectedCol,
    newName,
    setNewName,
    targetType,
    setTargetType,
    findVal,
    setFindVal,
    replaceVal,
    setReplaceVal,
  };
}
