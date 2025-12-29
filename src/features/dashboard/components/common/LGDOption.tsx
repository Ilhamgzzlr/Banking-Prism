import { ParameterInput, SimpleFileUpload } from "../common";
import MultiSelect from "@components/ui/multiselect";

interface LGDOptionProps {
  method: "constant" | "rr_model" | "lgd_model";
  label: string;
  isSelected: boolean;
  onSelect: () => void;

  macroOptions: string[];

  // LGD specific
  lgdValue?: string;
  onLGDValueChange?: (value: string) => void;

  // RR Model specific
  rrFile?: File | null;
  onRrFileChange?: (file: File | null) => void;
  rrMacroColumns?: string[];
  onRrMacroColumnsChange?: (value: string[]) => void;
  rrModellingApproach?: "auto" | "custom";
  onRrModellingApproachChange?: (approach: "auto" | "custom") => void;

  // LGD Model specific
  lgdFile?: File | null;
  onLgdFileChange?: (file: File | null) => void;
  lgdMacroColumns?: string[];
  onLgdMacroColumnsChange?: (value: string[]) => void;
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
  macroOptions,
  lgdValue,
  onLGDValueChange,
  rrFile,
  onRrFileChange,
  rrMacroColumns,
  onRrMacroColumnsChange,
  rrModellingApproach,
  onRrModellingApproachChange,
  lgdFile,
  onLgdFileChange,
  lgdMacroColumns,
  onLgdMacroColumnsChange,
  lgdModellingApproach,
  onLgdModellingApproachChange,
  selectedModel
}: LGDOptionProps) => {

  const macroSelectOptions = macroOptions.map(col => ({
    label: col,
    value: col,
  }));

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

          {/* RR Model Content */}
          {method === "rr_model" && isSelected && (
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

                <MultiSelect
                  options={macroSelectOptions}
                  value={rrMacroColumns || []}
                  onChange={(vals) =>
                    onRrMacroColumnsChange?.(vals)
                  }
                  placeholder="Select macroeconomic data..."
                />
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

          {/* LGD Model Content */}
          {method === "lgd_model" && isSelected && (
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

                <MultiSelect
                  options={macroSelectOptions}
                  value={lgdMacroColumns || []}
                  onChange={(vals) =>
                    onLgdMacroColumnsChange?.(vals)
                  }
                  placeholder="Select macroeconomic data..."
                />
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