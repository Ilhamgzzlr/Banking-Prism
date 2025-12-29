// import type { TableData } from "../hooks/useResults";

// export const DEFAULT_TABLE_DATA: TableData[] = [
//   {
//     scenario: "Adverse1",
//     date: "2025-09-30",
//     ead_total: 5415000,
//     npl_total: 337857.730039,
//     npl_gross_pct: 0.062393,
//     npl_net_pct: 0.044043,
//     ckpn: 75753.389027,
//     equity: 74741.116793,
//     car: 0.224217,
//   },
//   {
//     scenario: "Adverse1",
//     date: "2025-12-31",
//     ead_total: 5470391,
//     npl_total: 281150.802733,
//     npl_gross_pct: 0.051394,
//     npl_net_pct: 0.036980,
//     ckpn: 63370.045756,
//     equity: 62345.350873,
//     car: 0.225296,
//   },
//   {
//     scenario: "Adverse1",
//     date: "2026-03-31",
//     ead_total: 5528613,
//     npl_total: 253541.191762,
//     npl_gross_pct: 0.045860,
//     npl_net_pct: 0.035498,
//     ckpn: 57284.175685,
//     equity: 56246.905311,
//     car: 0.225936,
//   },
//   {
//     scenario: "Adverse1",
//     date: "2026-06-30",
//     ead_total: 5588279,
//     npl_total: 240331.664361,
//     npl_gross_pct: 0.043006,
//     npl_net_pct: 0.033277,
//     ckpn: 54369.571695,
//     equity: 53319.571695,
//     car: 0.226227,
//   },
//   {
//     scenario: "Adverse2",
//     date: "2025-09-30",
//     ead_total: 5415000,
//     npl_total: 342808.044707,
//     npl_gross_pct: 0.063307,
//     npl_net_pct: 0.044063,
//     ckpn: 77132.482173,
//     equity: 76120.209938,
//     car: 0.225002,
//   },
//   {
//     scenario: "Adverse2",
//     date: "2025-12-31",
//     ead_total: 5470391,
//     npl_total: 288466.617316,
//     npl_gross_pct: 0.052732,
//     npl_net_pct: 0.040806,
//     ckpn: 65242.740762,
//     equity: 64218.045706,
//     car: 0.226171,
//   },
//   {
//     scenario: "Adverse2",
//     date: "2026-03-31",
//     ead_total: 5528215,
//     npl_total: 261561.651490,
//     npl_gross_pct: 0.047318,
//     npl_net_pct: 0.036587,
//     ckpn: 59275.420648,
//     equity: 58238.160273,
//     car: 0.226585,
//   },
//   {
//     scenario: "Adverse2",
//     date: "2026-06-30",
//     ead_total: 5588771,
//     npl_total: 248740.052569,
//     npl_gross_pct: 0.044516,
//     npl_net_pct: 0.034418,
//     ckpn: 56428.734706,
//     equity: 55376.734706,
//     car: 0.226849,
//   },
//   {
//     scenario: "Baseline",
//     date: "2025-09-30",
//     ead_total: 5415000,
//     npl_total: 318017.817787,
//     npl_gross_pct: 0.058729,
//     npl_net_pct: 0.045745,
//     ckpn: 70309.084862,
//     equity: 69297.412628,
//     car: 0.221087,
//   },
//   {
//     scenario: "Baseline",
//     date: "2025-12-31",
//     ead_total: 5471191,
//     npl_total: 252671.145758,
//     npl_gross_pct: 0.046162,
//     npl_net_pct: 0.035907,
//     ckpn: 56217.154939,
//     equity: 55192.459862,
//     car: 0.222491,
//   },
//   {
//     scenario: "Baseline",
//     date: "2026-03-31",
//     ead_total: 5530185,
//     npl_total: 220616.684841,
//     npl_gross_pct: 0.039893,
//     npl_net_pct: 0.030987,
//     ckpn: 49254.862365,
//     equity: 48217.591990,
//     car: 0.223260,
//   },
//   {
//     scenario: "Baseline",
//     date: "2026-06-30",
//     ead_total: 5590928,
//     npl_total: 205132.432348,
//     npl_gross_pct: 0.036690,
//     npl_net_pct: 0.028481,
//     ckpn: 45886.999998,
//     equity: 44846.999998,
//     car: 0.223743,
//   },
// ];

export const TABLE_COLUMNS = [
  {
    key: "scenario",
    label: "Scenario",
    align: "left" as const,
    width: "120px",
  },
  {
    key: "date",
    label: "Tanggal",
    align: "left" as const,
    width: "130px",
  },
  {
    key: "el",
    label: "EL",
    align: "right" as const,
    width: "130px",
    format: (value: number) => value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  },
  {
    key: "equity",
    label: "Equity",
    align: "right" as const,
    width: "130px",
    format: (value: number) => value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  },
  {
    key: "car",
    label: "CAR",
    align: "right" as const,
    width: "100px",
    format: (value: number) => `${(value * 100).toFixed(4)}%`
  },
  {
    key: "npl_gross",
    label: "NPL_GROSS",
    align: "right" as const,
    width: "130px",
    format: (value: number) => value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  },
  {
    key: "npl_gross_ratio",
    label: "NPL_GROSS_RATIO",
    align: "right" as const,
    width: "140px",
    format: (value: number) => `${(value * 100).toFixed(3)}%`
  },
  {
    key: "npl_net",
    label: "NPL_NET",
    align: "right" as const,
    width: "130px",
    format: (value: number) => value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  },
  {
    key: "npl_net_ratio",
    label: "NPL_NET_RATIO",
    align: "right" as const,
    width: "130px",
    format: (value: number) => `${(value * 100).toFixed(3)}%`
  },
  {
    key: "default_flow",
    label: "DEFAULT_FLOW",
    align: "right" as const,
    width: "130px",
    format: (value: number) => value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  },
  {
    key: "cure_flow",
    label: "CURE_FLOW",
    align: "right" as const,
    width: "130px",
    format: (value: number) => value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  },
  {
    key: "writeoff_flow",
    label: "WRITEOFF_FLOW",
    align: "right" as const,
    width: "130px",
    format: (value: number) => value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }
] as const;

export const CHART_CONFIG = {
  nplGross: {
    title: "NPL Gross Ratio",
    width: 800,
    height: 400
  },
  nplNet: {
    title: "NPL Net Ratio",
    width: 800,
    height: 400
  },
  car: {
    title: "Capital Adequacy Ratio (CAR)",
    width: 800,
    height: 400
  }
} as const;