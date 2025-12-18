// utils/buildMacroFactorsFromMacroColumns.ts
import type { MacroFactor } from "@/features/dashboard/components/tabs/hooks/useMacroFactors";
import type { Page5Macro } from "@/types/page5Macro";

const IGNORED_COLUMNS = ["date", "year", "month", "tanggal"];

const normalize = (col: string) =>
  col.trim();
const isIgnored = (col: string) =>
  IGNORED_COLUMNS.includes(col.toLowerCase());

export const buildMacroFactors = (
  stressColumns: string[],
  macroColumns: string[],
  savedMacroFactors?: Page5Macro["macro_factors"]
): MacroFactor[] => {

  const filteredStressColumns = stressColumns
    .map(normalize)
    .filter(c => !isIgnored(c));

  const filteredMacroColumns = macroColumns
    .map(normalize)
    .filter(c => !isIgnored(c));

  const savedMap = new Map(
    savedMacroFactors?.map(item => [item.column_name, item]) ?? []
  );

  return filteredStressColumns.map(col => {
    const saved = savedMap.get(col);

    return {
      id: col,
      name: col,
      selected: saved ? saved.is_macro_factor : false,
      subFactors: filteredMacroColumns,
      selectedSubFactors: saved?.related_historical_macros ?? [],
    };
  });
};