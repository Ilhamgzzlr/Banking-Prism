import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Risk Limit */}
                <div className="space-y-2">
                  <Label htmlFor={`risk-limit-${index}`}>
                    Risk Limit
                  </Label>
                  <Input
                    id={`risk-limit-${index}`}
                    type="number"
                    value={metric.riskLimit}
                    onChange={(e) =>
                      handleValidatedInputChange(index, "riskLimit", e.target.value)
                    }
                    className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${metric.riskLimit === "" ? "border-red-300" : ""}`}
                    placeholder="e.g., 0.05"
                    required
                  />
                </div>

                {/* Risk Tolerance */}
                <div className="space-y-2">
                  <Label htmlFor={`risk-tolerance-${index}`}>
                    Risk Tolerance
                  </Label>
                  <Input
                    id={`risk-tolerance-${index}`}
                    type="number"
                    value={metric.riskTolerance}
                    onChange={(e) =>
                      handleValidatedInputChange(index, "riskTolerance", e.target.value)
                    }
                    className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${metric.riskTolerance === "" ? "border-red-300" : ""}`}
                    placeholder="e.g., 0.05"
                    required
                  />
                </div>

                {/* Risk Appetite */}
                <div className="space-y-2">
                  <Label htmlFor={`risk-appetite-${index}`}>
                    Risk Appetite
                  </Label>
                  <Input
                    id={`risk-appetite-${index}`}
                    type="number"
                    value={metric.riskAppetite}
                    onChange={(e) =>
                      handleValidatedInputChange(index, "riskAppetite", e.target.value)
                    }
                    className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${metric.riskAppetite === "" ? "border-red-300" : ""}`}
                    placeholder="e.g., 0.05"
                    required
                  />
                </div>

                {/* Risk Capacity */}
                <div className="space-y-2">
                  <Label htmlFor={`risk-capacity-${index}`}>
                    Risk Capacity
                  </Label>
                  <Input
                    id={`risk-capacity-${index}`}
                    type="number"
                    value={metric.riskCapacity}
                    onChange={(e) =>
                      handleValidatedInputChange(index, "riskCapacity", e.target.value)
                    }
                    className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${metric.riskCapacity === "" ? "border-red-300" : ""}`}
                    placeholder="e.g., 0.05"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}