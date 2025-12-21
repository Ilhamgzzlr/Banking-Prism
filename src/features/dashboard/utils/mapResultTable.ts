import type { ResultsTableRowAPI } from "@/types/result";
import type { TableData } from "@features/dashboard/components/tabs/hooks/useResults";

export const mapResultTable = (
  rows: ResultsTableRowAPI[]
): TableData[] =>
  rows.map(r => ({
    scenario: "Baseline", // API table default baseline
    date: r.Date,
    ead_total:
      r.pd_corp_EAD +
      r.pd_micro_EAD +
      r.pd_housing_EAD +
      r.pd_asn_EAD,

    npl_total: r.NPL_Net_Stock,
    npl_gross_pct: r.NPL_Rate_Gross,
    npl_net_pct: r.NPL_Rate_Net,

    ckpn: r.CKPN,
    equity: r.Equity,
    car: r.CAR,
  }));
