export interface ResultTableRow {
  scenario: string;
  date: string;
  el: number;
  equity: number;
  car: number;
  npl_gross: number;
  npl_gross_ratio: number;
  npl_net: number;
  npl_net_ratio: number;
  default_flow: number;
  cure_flow: number;
  writeoff_flow: number;
}

/**
 * Map raw API result data to table format
 * Input: API response with credit_result nested structure
 * Output: Flat array of rows for table display
 */
export function mapResultTable(apiData: any): ResultTableRow[] {
  const results: ResultTableRow[] = [];
  
  if (!apiData || !apiData.credit_result) {
    return results;
  }

  const creditResult = apiData.credit_result;
  const scenarios = apiData.scenario_levels || Object.keys(creditResult).filter(
    key => !key.includes('_per_segment')
  );

  // Iterate through each scenario
  scenarios.forEach((scenario: string) => {
    const scenarioData = creditResult[scenario];
    
    if (!scenarioData || !scenarioData.index || !scenarioData.data) {
      return;
    }

    const dates = scenarioData.index;
    const columns = scenarioData.columns;
    const data = scenarioData.data;

    // Map column names to indices
    const colIndices: Record<string, number> = {};
    columns.forEach((col: string, idx: number) => {
      colIndices[col] = idx;
    });

    // Create a row for each date
    dates.forEach((date: string, dateIdx: number) => {
      const rowData = data[dateIdx];
      
      results.push({
        scenario: scenario,
        date: formatDate(date),
        el: rowData[colIndices['EL']] || 0,
        equity: rowData[colIndices['Equity']] || 0,
        car: rowData[colIndices['CAR']] || 0,
        npl_gross: rowData[colIndices['NPL_GROSS']] || 0,
        npl_gross_ratio: rowData[colIndices['NPL_GROSS_RATIO']] || 0,
        npl_net: rowData[colIndices['NPL_NET']] || 0,
        npl_net_ratio: rowData[colIndices['NPL_NET_RATIO']] || 0,
        default_flow: rowData[colIndices['DEFAULT_FLOW']] || 0,
        cure_flow: rowData[colIndices['CURE_FLOW']] || 0,
        writeoff_flow: rowData[colIndices['WRITEOFF_FLOW']] || 0,
      });
    });
  });

  return results;
}

/**
 * Format date from YYYY-MM-DD to readable format
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * Prepare chart data for line charts
 */
export function prepareChartData(apiData: any) {
  if (!apiData || !apiData.credit_result) {
    return {
      nplGross: [],
      nplNet: [],
      car: [],
    };
  }

  const creditResult = apiData.credit_result;
  const scenarios = apiData.scenario_levels || Object.keys(creditResult).filter(
    key => !key.includes('_per_segment')
  );

  // Prepare data structure for charts
  const nplGrossData: any[] = [];
  const nplNetData: any[] = [];
  const carData: any[] = [];

  scenarios.forEach((scenario: string) => {
    const scenarioData = creditResult[scenario];
    
    if (!scenarioData) return;

    const dates = scenarioData.index;
    const columns = scenarioData.columns;
    const data = scenarioData.data;

    const colIndices: Record<string, number> = {};
    columns.forEach((col: string, idx: number) => {
      colIndices[col] = idx;
    });

    dates.forEach((date: string, dateIdx: number) => {
      const rowData = data[dateIdx];
      const formattedDate = formatDate(date);

      // Find or create entry for this date
      let nplGrossEntry = nplGrossData.find(d => d.date === formattedDate);
      if (!nplGrossEntry) {
        nplGrossEntry = { date: formattedDate };
        nplGrossData.push(nplGrossEntry);
      }
      nplGrossEntry[scenario] = (rowData[colIndices['NPL_GROSS_RATIO']] || 0) * 100;

      let nplNetEntry = nplNetData.find(d => d.date === formattedDate);
      if (!nplNetEntry) {
        nplNetEntry = { date: formattedDate };
        nplNetData.push(nplNetEntry);
      }
      nplNetEntry[scenario] = (rowData[colIndices['NPL_NET_RATIO']] || 0) * 100;

      let carEntry = carData.find(d => d.date === formattedDate);
      if (!carEntry) {
        carEntry = { date: formattedDate };
        carData.push(carEntry);
      }
      carEntry[scenario] = (rowData[colIndices['CAR']] || 0) * 100;
    });
  });

  return {
    nplGross: nplGrossData,
    nplNet: nplNetData,
    car: carData,
  };
}
