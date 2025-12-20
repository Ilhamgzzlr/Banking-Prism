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
  const {
    orderId,
    pageResult,
    saveResult,
    calculationStatus,
    setCalculationStatus,
    reset: resetStore,
  } = useOrderStore();

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
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
    if (pageResult?.rawResult) {
      setTableData(
        mapResultTable(pageResult.rawResult.results_table_data)
      );
      return;
    }

    const fetchResultOnly = async () => {
      const res = await OrdersAPI.getResult(orderId);
      saveResult(res.data);
      setTableData(
        mapResultTable(res.data.results_table_data)
      );
    };

    const runAndFetch = async () => {
      try {
        setIsCalculating(true);
        setCalculationStatus("RUNNING");

        await OrdersAPI.runCalculation(orderId);
        await fetchResultOnly();
      } catch (err) {
        console.error("Calculation failed", err);
        setCalculationStatus("NOT_STARTED");
      } finally {
        setIsCalculating(false);
      }
    };

    // 2️⃣ logic utama
    if (calculationStatus === "DONE") {
      fetchResultOnly();
    } else if (calculationStatus === "NOT_STARTED") {
      runAndFetch();
    } else if (calculationStatus === "RUNNING") {
      // optional: polling status backend
      setIsCalculating(true);
    }
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
      chartType: "line",
      dataKey: "car"
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

  const handleCreateNewTest = () => {
    // Konfirmasi dengan user
    // if (window.confirm("Are you sure you want to create a new test? All current data will be reset.")) {
    // Reset store
    resetStore();

    // Reset local state
    setTableData([]);
    setExpandedSections({
      table: true,
      nplGross: false,
      nplNet: false,
      car: false,
      summary: false
    });
    // }
  };


  return {
    tableData,
    chartData,
    isCalculating,
    expandedSections,
    chartSections,
    toggleSection,
    expandAll,
    collapseAll,
    downloadTableCSV,
    handleCreateNewTest
  };
};