import { CreditRisk } from "../tabs/risk-types";

interface RiskTypeRendererProps {
  riskType: string;
  metrics?: any[];
  onMetricsChange?: (metrics: any[]) => void;
}

const RiskTypeRenderer = ({ riskType, metrics, onMetricsChange }: RiskTypeRendererProps) => {
  switch (riskType) {
    case "Credit Risk":
      return (
        <CreditRisk
          initialMetrics={metrics}
          onMetricsChange={onMetricsChange}
        />
      );
    case "Liquidity Risk":
      return (
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-700">Liquidity Risk Analysis</h3>
          <p className="text-sm text-gray-500 mt-1">Coming Soon</p>
        </div>
      );
    case "Market Risk":
      return (
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-700">Market Risk Analysis</h3>
          <p className="text-sm text-gray-500 mt-1">Coming Soon</p>
        </div>
      );
    default:
      return <div className="p-8 text-center text-gray-500">Select a risk type</div>;
  }
};

export default RiskTypeRenderer;