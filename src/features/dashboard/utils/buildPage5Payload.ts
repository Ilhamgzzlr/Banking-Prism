// buildPage5Payload.ts

export const buildPage5Payload = (
  factors: any[],
  showPercentileSection: boolean
) => {
  return {
    macro_factors: factors.map(f => ({
      column_name: f.id, // HARUS nama kolom
      is_macro_factor: f.selected,
      related_historical_macros: f.selected
        ? f.selectedSubFactors ?? []
        : null
    })),
    no_macro_percentile: showPercentileSection
      ? undefined
      : factors.filter(f => f.selected).map(f => f.id)
  };
};
