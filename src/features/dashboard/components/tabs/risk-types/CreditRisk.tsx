import { useState, useEffect } from "react";

interface RiskMetric {
  name: string;
  riskLimit: string;
  riskTolerance: string;
  riskAppetite: string;
  riskCapacity: string;
}

interface CreditRiskProps {
  initialMetrics?: RiskMetric[];
  onMetricsChange?: (metrics: RiskMetric[]) => void;
}

export default function CreditRisk({
  initialMetrics,
  onMetricsChange
}: CreditRiskProps) {
  const [metrics, setMetrics] = useState<RiskMetric[]>(
    initialMetrics && initialMetrics.length > 0
      ? initialMetrics
      : [
        {
          name: "NPL Gross",
          riskLimit: "",
          riskTolerance: "",
          riskAppetite: "",
          riskCapacity: ""
        },
        {
          name: "NPL Net",
          riskLimit: "",
          riskTolerance: "",
          riskAppetite: "",
          riskCapacity: ""
        },
        {
          name: "Capital Adequacy Ratio (CAR)",
          riskLimit: "",
          riskTolerance: "",
          riskAppetite: "",
          riskCapacity: ""
        }
      ]
  );

  // Notify parent ketika metrics berubah
  useEffect(() => {
    if (metrics.some(m =>
      m.riskLimit || m.riskTolerance || m.riskAppetite || m.riskCapacity
    )) {
      onMetricsChange?.(metrics);
    }
  }, [metrics]);


  const handleInputChange = (
    index: number,
    field: keyof Omit<RiskMetric, "name">,
    value: string
  ) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
  };

  // Validasi input numerik (opsional)
  const validateNumericInput = (value: string): boolean => {
    if (value === "") return true; // Allow empty for validation in parent
    const num = parseFloat(value);
    return !isNaN(num);
  };

  // Handler untuk input dengan validasi
  const handleValidatedInputChange = (
    index: number,
    field: keyof Omit<RiskMetric, "name">,
    value: string
  ) => {
    if (validateNumericInput(value)) {
      handleInputChange(index, field, value);
    }
  };

  return (
    <div className="space-y-6">

      {/* Risk Metrics */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                {metric.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Risk Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Risk Limit
                </label>
                <input
                  type="text"
                  value={metric.riskLimit}
                  onChange={(e) =>
                    handleValidatedInputChange(index, "riskLimit", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${metric.riskLimit === "" ? "border-red-300" : "border-gray-300"
                    }`}
                  placeholder="e.g., 0.05"
                  required
                />
              </div>

              {/* Risk Tolerance */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Risk Tolerance
                </label>
                <input
                  type="text"
                  value={metric.riskTolerance}
                  onChange={(e) =>
                    handleValidatedInputChange(index, "riskTolerance", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${metric.riskAppetite === "" ? "border-red-300" : "border-gray-300"
                    }`}
                  placeholder="e.g., 0.05"
                  required
                />
              </div>

              {/* Risk Appetite */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Risk Appetite
                </label>
                <input
                  type="text"
                  value={metric.riskAppetite}
                  onChange={(e) =>
                    handleValidatedInputChange(index, "riskAppetite", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${metric.riskAppetite === "" ? "border-red-300" : "border-gray-300"
                    }`}
                  placeholder="e.g., 0.05"
                  required
                />
              </div>

              {/* Risk Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Risk Capacity
                </label>
                <input
                  type="text"
                  value={metric.riskCapacity}
                  onChange={(e) =>
                    handleValidatedInputChange(index, "riskCapacity", e.target.value)
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${metric.riskCapacity === "" ? "border-red-300" : "border-gray-300"
                    }`}
                  placeholder="e.g., 0.05"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}