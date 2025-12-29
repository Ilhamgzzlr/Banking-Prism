import { Download, Maximize2, Minimize2, AlertCircle } from "lucide-react";
import { ExpandableSection, ResultsTable, ScenarioLineChart, ResultLoading } from "../common";
import { useResults } from "./hooks/useResults";
import { TABLE_COLUMNS } from "./data/resultConfig";
import { formatMetric, METRIC_CONFIG } from "@features/dashboard/utils/formatMetric";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function ResultTab() {
    const {
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
    } = useResults();

    if (isCalculating) {
        return (
            <div className="space-y-4">
                <ResultLoading />
                <div className="flex flex-col items-center gap-4 p-8">
                    <div className="w-full max-w-md space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Calculation Progress</span>
                            <span>{calculationProgress}%</span>
                        </div>
                        <Progress value={calculationProgress} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-500">
                        Processing your stress testing calculation...
                    </p>
                </div>
            </div>
        );
    }

    if (calculationError) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Calculation Error</AlertTitle>
                    <AlertDescription>
                        {calculationError}
                    </AlertDescription>
                </Alert>
                <div className="mt-4">
                    <Button
                        onClick={handleCreateNewTest}
                        variant="outline"
                    >
                        Start New Test
                    </Button>
                </div>
            </div>
        );
    }

    if (!tableData || tableData.length === 0) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center space-y-2">
                    <p className="text-gray-500">No results available yet</p>
                    <p className="text-sm text-gray-400">Complete all configuration steps and run the calculation</p>
                </div>
            </div>
        );
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
                const data = chartData[chart.id as keyof typeof chartData];

                return (
                    <ExpandableSection
                        key={chart.id}
                        title={metric.label}
                        isExpanded={expandedSections[chart.id]}
                        onToggle={() => toggleSection(chart.id)}
                    >
                        <div className="p-4">
                            {data && data.length > 0 ? (
                                <ScenarioLineChart
                                    data={data}
                                    valueFormatter={(v) =>
                                        formatMetric(v, metric.type, metric.decimals)
                                    }
                                />
                            ) : (
                                <p className="text-sm text-gray-500">No chart data available</p>
                            )}
                        </div>
                    </ExpandableSection>
                );
            })}

            {/* Action Buttons */}
            <div className="flex justify-end items-center pt-4 border-t">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            className="flex items-center gap-2 px-4 py-2 text-white bg-purple-600 border rounded-md hover:bg-purple-700 transition-colors"
                            size="lg"
                        >
                            Create New Test
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Create New Test?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will reset all current results and charts.
                                This cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleCreateNewTest}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                Yes, Create New Test
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}