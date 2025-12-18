// types/orders.ts
export interface MacroSelection {
  column_name: string;
  is_macro_factor: boolean;
  related_historical_macros?: string[] | null;
}

export interface Page5Macro {
  macro_factors: MacroSelection[];
  no_macro_percentile?: string[] | null;
}
