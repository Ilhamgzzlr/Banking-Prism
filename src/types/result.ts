export interface ResultsTableRowAPI {
  Date: string;
  Equity: number;
  CAR: number;
  NPL_Rate_Gross: number;
  NPL_Rate_Net: number;
  CKPN: number;
  [key: string]: any;
}

export interface ScenarioSeriesItem {
  Date: string;
  Baseline: number;
  Adverse1: number;
  Adverse2: number;
}

export interface OrderResultResponse {
  results_table_data: ResultsTableRowAPI[];
  npl_gross_series: ScenarioSeriesItem[];
  npl_net_series: ScenarioSeriesItem[];
  car_series: ScenarioSeriesItem[];
  diagnostics: any;
}
