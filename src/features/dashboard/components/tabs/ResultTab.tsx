import { Download, Maximize2, Minimize2 } from "lucide-react";
import { ExpandableSection, ResultsTable, ScenarioLineChart, ResultLoading } from "../common";
import { useResults } from "./hooks/useResults";
import { TABLE_COLUMNS } from "./data/resultConfig";
import { formatMetric, METRIC_CONFIG } from "@features/dashboard/utils/formatMetric";

export default function ResultTab() {
    const {
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
    } = useResults();

    if (isCalculating) {
        return <ResultLoading />;
    }

    const handleExportResults = () => {
        downloadTableCSV();
        alert("Results exported to CSV successfully!");
    };

    return (
        <div className="space-y-2">
            {/* Header with Actions */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Stress Testing Results</h2>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={expandAll}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        type="button"
                    >
                        <Maximize2 className="w-4 h-4" />
                        Expand All
                    </button>
                    <button
                        onClick={collapseAll}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        type="button"
                    >
                        <Minimize2 className="w-4 h-4" />
                        Collapse All
                    </button>
                    <button
                        onClick={handleExportResults}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        type="button"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>
            {/* Credit Simulation Results Table */}
            <ExpandableSection
                title="Credit Simulation Results Table"
                isExpanded={expandedSections.table}
                onToggle={() => toggleSection("table")}
                badge={`${tableData.length} rows`}
            >
                <div className="p-4">
                    <ResultsTable
                        data={tableData}
                        columns={TABLE_COLUMNS}
                    />
                </div>
            </ExpandableSection>

            {/* Chart Sections */}
            {chartSections.map((chart) => {
                const metric = METRIC_CONFIG[chart.id as keyof typeof METRIC_CONFIG];

                return (
                    <ExpandableSection
                        key={chart.id}
                        title={metric.label}
                        isExpanded={expandedSections[chart.id]}
                        onToggle={() => toggleSection(chart.id)}
                    >
                        <div className="p-4">
                            <ScenarioLineChart
                                data={chartData[chart.id as keyof typeof chartData]}
                                valueFormatter={(v) =>
                                    formatMetric(v, metric.type, metric.decimals)
                                }
                            />
                        </div>
                    </ExpandableSection>
                );
            })}


            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
                <div>
                    <button
                        onClick={handleCreateNewTest}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        type="button"
                    >
                        {/* <Plus className="w-4 h-4" /> */}
                        Create New Test
                    </button>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportResults}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        type="button"
                    >
                        <Download className="w-4 h-4" />
                        Export Full Report
                    </button>
                </div>
            </div>
        </div>
    );
}