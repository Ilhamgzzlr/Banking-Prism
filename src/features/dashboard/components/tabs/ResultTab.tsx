import { Download, Maximize2, Minimize2 } from "lucide-react";
import { ExpandableSection, ResultsTable, ChartPlaceholder } from "../common";
import { useResults } from "./hooks/useResults";
import { TABLE_COLUMNS } from "./data/resultConfig";

export default function ResultTab() {
    const {
        tableData,
        expandedSections,
        chartSections,
        toggleSection,
        expandAll,
        collapseAll,
        downloadTableCSV
    } = useResults();


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
            {chartSections.map((chart) => (
                <ExpandableSection
                    key={chart.id}
                    title={chart.title}
                    isExpanded={expandedSections[chart.id]}
                    onToggle={() => toggleSection(chart.id)}
                >
                    <div className="p-4">
                        <ChartPlaceholder
                            width={800}
                            height={400}
                        />
                    </div>
                </ExpandableSection>
            ))}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    onClick={handleExportResults}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    type="button"
                >
                    <Download className="w-4 h-4" />
                    Export Full Report
                </button>

            </div>
        </div>
    );
}