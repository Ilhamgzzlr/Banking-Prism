import { useState, useEffect, useRef } from 'react';
import { OrdersAPI } from "@/api/orders.api";
import { useOrderStore } from "@/stores/useOrderStore";
import { mapResultTable, prepareChartData } from "@features/dashboard/utils/mapResultTable";

export interface TableData {
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
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    table: true,
    nplGross: false,
    nplNet: false,
    car: false,
    summary: false
  });

  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const taskIdRef = useRef<string | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Poll task status
  const pollTaskStatus = async (taskId: string) => {
    try {
      const statusData = await OrdersAPI.getTaskStatus(taskId);
      
      setCalculationProgress(statusData.progress || 0);

      if (statusData.status === "COMPLETED") {
        // Task completed, fetch result
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        
        await fetchResultOnly();
        setIsCalculating(false);
        setCalculationStatus("DONE");
        taskIdRef.current = null;
      } else if (statusData.status === "FAILED") {
        // Task failed
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        
        setCalculationError(statusData.error_message || "Calculation failed");
        setIsCalculating(false);
        setCalculationStatus("NOT_STARTED");
        taskIdRef.current = null;
      }
      // For PROCESSING or PENDING, continue polling
    } catch (err) {
      console.error("Error polling task status:", err);
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      setCalculationError("Failed to check calculation status");
      setIsCalculating(false);
      setCalculationStatus("NOT_STARTED");
      taskIdRef.current = null;
    }
  };

  const fetchResultOnly = async () => {
    if (!orderId) return;
    
    try {
      const res = await OrdersAPI.getResult(orderId);
      saveResult(res);
      // Pass entire response data to mapResultTable
      setTableData(mapResultTable(res));
      setCalculationError(null);
    } catch (err) {
      console.error("Failed to fetch result:", err);
      setCalculationError("Failed to fetch calculation results");
    }
  };

  const runAndFetch = async () => {
    if (!orderId) return;
    
    try {
      setIsCalculating(true);
      setCalculationProgress(0);
      setCalculationError(null);
      setCalculationStatus("RUNNING");

      // Start calculation
      const startData = await OrdersAPI.startCalculation(orderId);
      taskIdRef.current = startData.task_id;

      // Start polling for task status
      pollingIntervalRef.current = setInterval(() => {
        if (taskIdRef.current) {
          pollTaskStatus(taskIdRef.current);
        }
      }, 2000); // Poll every 2 seconds

    } catch (err) {
      console.error("Calculation failed to start", err);
      setCalculationError("Failed to start calculation");
      setCalculationStatus("NOT_STARTED");
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (!orderId) return;

    // If result already in store, use it
    if (pageResult?.rawResult) {
      setTableData(mapResultTable(pageResult.rawResult));
      return;
    }

    // Main logic based on calculation status
    if (calculationStatus === "DONE") {
      fetchResultOnly();
    } else if (calculationStatus === "NOT_STARTED") {
      runAndFetch();
    } else if (calculationStatus === "RUNNING" && !isCalculating) {
      // Resume if interrupted
      setIsCalculating(true);
    }
  }, [orderId, calculationStatus]);

  const chartData = pageResult?.rawResult ? prepareChartData(pageResult.rawResult) : {
    nplGross: [],
    nplNet: [],
    car: [],
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
    if (tableData.length === 0) return;
    
    // Define headers in order
    const headers = [
      'Scenario',
      'Tanggal',
      'EL',
      'Equity',
      'CAR',
      'NPL_GROSS',
      'NPL_GROSS_RATIO',
      'NPL_NET',
      'NPL_NET_RATIO',
      'DEFAULT_FLOW',
      'CURE_FLOW',
      'WRITEOFF_FLOW'
    ];
    
    const rows = tableData.map(row => [
      row.scenario,
      row.date,
      row.el,
      row.equity,
      row.car,
      row.npl_gross,
      row.npl_gross_ratio,
      row.npl_net,
      row.npl_net_ratio,
      row.default_flow,
      row.cure_flow,
      row.writeoff_flow
    ].map(val => 
      typeof val === 'number' ? val.toString() : `"${val}"`
    ).join(','));
    
    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credit_simulation_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCreateNewTest = () => {
    // Clear polling if active
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    
    taskIdRef.current = null;
    resetStore();
    setTableData([]);
    setCalculationProgress(0);
    setIsCalculating(false);
    setCalculationError(null);
    setExpandedSections({
      table: true,
      nplGross: false,
      nplNet: false,
      car: false,
      summary: false
    });
  };

  return {
    tableData,
    chartData,
    isCalculating,
    calculationProgress,
    calculationError,
    expandedSections,
    chartSections,
    toggleSection,
    expandAll,
    collapseAll,
    downloadTableCSV,
    handleCreateNewTest
  };
};