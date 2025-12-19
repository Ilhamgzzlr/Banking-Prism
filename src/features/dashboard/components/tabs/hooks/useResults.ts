import { useState, useEffect } from 'react';
import { OrdersAPI } from "@/api/orders.api";
import { useOrderStore } from "@/stores/useOrderStore";
import { mapResultTable } from "@features/dashboard/utils/mapResultTable";

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

export const useResults = () => {
  const { orderId, pageResult, saveResult } = useOrderStore();

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    table: true,
    nplGross: false,
    nplNet: false,
    car: false,
    summary: false
  });

  useEffect(() => {
    if (!orderId) return;

    // already in store → reuse
    // if (pageResult?.rawResult) {
    //   setTableData(
    //     mapResultTable(pageResult.rawResult.results_table_data)
    //   );
    //   return;
    // }

    const fetchResult = async () => {
      try {
        const res = await OrdersAPI.getResult(orderId);
        saveResult(res.data);

        setTableData(
          mapResultTable(res.data.results_table_data)
        );
      } catch (e) {
        console.error("Failed to fetch result", e);
      }
    };

    fetchResult();
  }, [orderId]);

  const chartData = {
    nplGross: pageResult?.rawResult?.npl_gross_series || [],
    nplNet: pageResult?.rawResult?.npl_net_series || [],
    car: pageResult?.rawResult?.car_series || [],
  };

  

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
    chartData,
    expandedSections,
    chartSections,
    toggleSection,
    expandAll,
    collapseAll,
    downloadTableCSV,
  };
};