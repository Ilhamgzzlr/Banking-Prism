import { ParameterInput, SimpleFileUpload } from "../common";

interface LGDOptionProps {
  method: "constant" | "modelling_rr" | "modelling_lgd";
  label: string;
  isSelected: boolean;
  onSelect: () => void;

  // LGD specific
  lgdValue?: string;
  onLGDValueChange?: (value: string) => void;

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

  selectedModel?: {
    id: string;
    name: string;
  } | null;

}

const LGDOption = ({
  method,
  label,
  isSelected,
  onSelect,
  lgdValue,
  onLGDValueChange,
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
  onLgdModellingApproachChange,
  selectedModel
}: LGDOptionProps) => {
  return (
    <div className="space-y-2 border-b pb-4 last:border-b-0">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="radio"
          name="lgd_method"
          checked={isSelected}
          onChange={onSelect}
          className="accent-purple-600 size-4 mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>

          {/* RR Value Input */}
          {method === "constant" && isSelected && onLGDValueChange && (
            <div className="mt-3">
              <ParameterInput
                label="Loss Given Default Value"
                name="lgd_constant_value"
                value={lgdValue || ""}
                onChange={onLGDValueChange}
                placeholder="e.g., 0.1"
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
                onFileSelect={onRrFileChange || (() => { })}
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
                        className="accent-purple-600 size-4"
                      />
                      <span className="text-sm text-gray-700">Auto</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rr_modelling_approach"
                        checked={rrModellingApproach === "custom"}
                        onChange={() => onRrModellingApproachChange("custom")}
                        className="accent-purple-600 size-4"
                      />
                      <span className="text-sm text-gray-700">Custom</span>
                    </label>
                    {selectedModel && (
                      <div className="rounded-md bg-blue-50 border border-blue-200 px-3 py-2 text-sm text-blue-800">
                        <span className="font-medium">Selected Model:</span>{" "}
                        {selectedModel.name}
                      </div>
                    )}

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
                onFileSelect={onLgdFileChange || (() => { })}
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
                        className="accent-purple-600 size-4"
                      />
                      <span className="text-sm text-gray-700">Auto</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="lgd_modelling_approach"
                        checked={lgdModellingApproach === "custom"}
                        onChange={() => onLgdModellingApproachChange("custom")}
                        className="accent-purple-600 size-4"
                      />
                      <span className="text-sm text-gray-700">Custom</span>
                    </label>
                    {selectedModel && (
                      <div className="rounded-md bg-blue-50 border border-blue-200 px-3 py-2 text-sm text-blue-800">
                        <span className="font-medium">Selected Model:</span>{" "}
                        {selectedModel.name}
                      </div>
                    )}

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