import type { NavItem } from "@/components/nav-main";
import type { NavBuilderContext } from "./types";
import { buildIngestionNav } from "./buildIngestionNav";
import { buildPretrainingNav } from "./buildPretrainingNav";

export function buildDataNav(ctx: NavBuilderContext): NavItem[] {
  return [buildIngestionNav(ctx), buildPretrainingNav(ctx)];
}
