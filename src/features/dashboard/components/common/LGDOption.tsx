import { ParameterInput, SimpleFileUpload } from "../common";

interface LGDOptionProps {
  method: "rr" | "modelling_rr" | "modelling_lgd";
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  
  // RR specific
  rrValue?: string;
  onRrValueChange?: (value: string) => void;
  
  // Modelling RR specific
  rrFile?: File | null;
  onRrFileChange?: (file: File | null) => void;
  rrMacroColumn?: string;
  onRrMacroColumnChange?: (value: string) => void;
  rrModellingApproach?: "auto" | "custom";
  onRrModellingApproachChange?: (approach: "auto" | "custom") => void;
  
  // Modelling LGD specific
  lgdFile?: File | null;
  onLgdFileChange?: (file: File | null) => void;
  lgdMacroColumn?: string;
  onLgdMacroColumnChange?: (value: string) => void;
  lgdModellingApproach?: "auto" | "custom";
  onLgdModellingApproachChange?: (approach: "auto" | "custom") => void;
}

const LGDOption = ({
  method,
  label,
  isSelected,
  onSelect,
  rrValue,
  onRrValueChange,
  rrFile,
  onRrFileChange,
  rrMacroColumn,
  onRrMacroColumnChange,
  rrModellingApproach,
  onRrModellingApproachChange,
  lgdFile,
  onLgdFileChange,
  lgdMacroColumn,
  onLgdMacroColumnChange,
  lgdModellingApproach,
  onLgdModellingApproachChange
}: LGDOptionProps) => {
  return (
    <div className="space-y-2 border-b pb-4 last:border-b-0">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="radio"
          name="lgd_method"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 text-blue-600 mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>

          {/* RR Value Input */}
          {method === "rr" && isSelected && onRrValueChange && (
            <div className="mt-3">
              <ParameterInput
                label="Loss Given Default Value"
                name="rr_value"
                value={rrValue || ""}
                onChange={onRrValueChange}
                placeholder="e.g., 80000"
                type="number"
              />
            </div>
          )}

          {/* Modelling RR Content */}
          {method === "modelling_rr" && isSelected && (
            <div className="mt-3 space-y-4">
              {/* Upload Historical RR Data */}
              <SimpleFileUpload
                label="Upload Historical RR Data"
                onFileSelect={onRrFileChange || (() => {})}
                selectedFile={rrFile || null}
                accept=".xlsx,.xls,.csv"
              />

              {/* Choose Related Macroeconomic Data */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Choose Related Macroeconomic Data
                </label>
                <select
                  value={rrMacroColumn || ""}
                  onChange={(e) => onRrMacroColumnChange?.(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select macroeconomic data...</option>
                  <option value="gdp">GDP</option>
                  <option value="inflation">Inflation</option>
                  <option value="unemployment">Unemployment</option>
                  <option value="interest_rate">Interest Rate</option>
                </select>
              </div>

              {/* Modelling Approach */}
              {onRrModellingApproachChange && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Modelling Approach
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rr_modelling_approach"
                        checked={rrModellingApproach === "auto"}
                        onChange={() => onRrModellingApproachChange("auto")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Auto</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rr_modelling_approach"
                        checked={rrModellingApproach === "custom"}
                        onChange={() => onRrModellingApproachChange("custom")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Custom</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modelling LGD Content */}
          {method === "modelling_lgd" && isSelected && (
            <div className="mt-3 space-y-4">
              {/* Upload Historical LGD Data */}
              <SimpleFileUpload
                label="Upload Historical LGD Data"
                onFileSelect={onLgdFileChange || (() => {})}
                selectedFile={lgdFile || null}
                accept=".xlsx,.xls,.csv"
              />

              {/* Choose Related Macroeconomic Data */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Choose Related Macroeconomic Data
                </label>
                <select
                  value={lgdMacroColumn || ""}
                  onChange={(e) => onLgdMacroColumnChange?.(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select macroeconomic data...</option>
                  <option value="gdp">GDP</option>
                  <option value="inflation">Inflation</option>
                  <option value="unemployment">Unemployment</option>
                  <option value="property_price">Property Price Index</option>
                </select>
              </div>

              {/* Modelling Approach */}
              {onLgdModellingApproachChange && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Modelling Approach
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="lgd_modelling_approach"
                        checked={lgdModellingApproach === "auto"}
                        onChange={() => onLgdModellingApproachChange("auto")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Auto</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="lgd_modelling_approach"
                        checked={lgdModellingApproach === "custom"}
                        onChange={() => onLgdModellingApproachChange("custom")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Custom</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default LGDOption;