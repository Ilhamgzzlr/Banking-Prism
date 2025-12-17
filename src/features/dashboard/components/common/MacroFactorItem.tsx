import { useState } from "react";

interface MacroFactorItemProps {
    factor: {
        id: string;
        name: string;
        selected: boolean;
        subFactors?: string[];
        selectedSubFactors?: string[];
    };
    onToggle: (id: string, value: boolean) => void;
    onSubFactorToggle: (factorId: string, subFactor: string) => void;
}

const MacroFactorItem = ({ factor, onToggle, onSubFactorToggle }: MacroFactorItemProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div>
            <div className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => factor.subFactors && setIsExpanded(!isExpanded)}
                        className={`p-1 rounded ${factor.subFactors ? 'hover:bg-gray-100' : 'invisible'}`}
                        disabled={!factor.subFactors}
                    >
                    </button>
                    <span className="font-medium text-gray-900">{factor.name}</span>

                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name={factor.id}
                            checked={factor.selected === true}
                            onChange={() => onToggle(factor.id, true)}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name={factor.id}
                            checked={factor.selected === false}
                            onChange={() => onToggle(factor.id, false)}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                    </label>
                </div>
            </div>

            {/* Sub-factors (only for factors with subFactors when Yes is selected) */}
            {factor.selected && factor.subFactors && isExpanded && (
                <div className="mt-2 ml-12 space-y-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Select Sub-factors:</h4>
                    <div className="space-y-2">
                        {factor.subFactors.map((subFactor) => (
                            <label
                                key={subFactor}
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                            >
                                <input
                                    type="checkbox"
                                    checked={factor.selectedSubFactors?.includes(subFactor) || false}
                                    onChange={() => onSubFactorToggle(factor.id, subFactor)}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <span className="text-sm text-gray-700">{subFactor}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MacroFactorItem;