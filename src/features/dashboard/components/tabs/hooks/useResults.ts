import { useState } from 'react';
import { DEFAULT_TABLE_DATA } from '../data/resultConfig';

export interface TableData {
  scenario: string;
  date: string;
  ead_total: number;
  npl_total: number;
  npl_gross_pct: number;
  npl_net_pct: number;
  crdm_total: number;
  crkm_sp: number;
  crkm_k1: number;
  coverage: number;
  cor: number;
}

export interface ChartSection {
  id: string;
  title: string;
  chartType: "line" | "bar" | "pie";
  dataKey: string;
}

export const useResults = (initialTableData: TableData[] = DEFAULT_TABLE_DATA) => {
  const [tableData, setTableData] = useState<TableData[]>(initialTableData);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    table: true,
    nplGross: false,
    nplNet: false,
    car: false,
    summary: false
  });

  const chartSections: ChartSection[] = [
    {
      id: "nplGross",
      title: "NPL Gross Ratio",
      chartType: "line",
      dataKey: "npl_gross_pct"
    },
    {
      id: "nplNet",
      title: "NPL Net Ratio",
      chartType: "line",
      dataKey: "npl_net_pct"
    },
    {
      id: "car",
      title: "Capital Adequacy Ratio (CAR)",
      chartType: "bar",
      dataKey: "coverage"
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    Object.keys(expandedSections).forEach(key => {
      allExpanded[key] = true;
    });
    setExpandedSections(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    Object.keys(expandedSections).forEach(key => {
      allCollapsed[key] = false;
    });
    setExpandedSections(allCollapsed);
  };

  const downloadTableCSV = () => {
    const headers = Object.keys(tableData[0]).join(',');
    const rows = tableData.map(row => 
      Object.values(row).map(val => 
        typeof val === 'number' ? val.toString() : `"${val}"`
      ).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credit_simulation_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    tableData,
    expandedSections,
    chartSections,
    toggleSection,
    expandAll,
    collapseAll,
    downloadTableCSV,
    setTableData
  };
};