import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ChevronRight } from 'lucide-react';

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
    onSelectAllSubFactors: (factorId: string) => void;
}

const MacroFactorItem = ({ factor, onToggle, onSubFactorToggle, onSelectAllSubFactors }: MacroFactorItemProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const allSelected =
        factor.subFactors &&
        factor.selectedSubFactors?.length === factor.subFactors.length;


    return (
        <div className="space-y-2">
            <Card>
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        {factor.subFactors ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                <ChevronRight
                                    className={`!h-5 !w-5 transition-transform duration-200 ${isExpanded ? "rotate-90" : "rotate-0"}`}
                                />
                            </Button>
                        ) : (
                            <div className="w-9" />
                        )}

                        <span className="font-medium">{factor.name}</span>
                    </div>

                    {/* Radio tetap native */}
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name={factor.id}
                                checked={factor.selected === true}
                                onChange={() => onToggle(factor.id, true)}
                                className="accent-purple-600 size-4"
                            />
                            <span className="text-sm">Yes</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name={factor.id}
                                checked={factor.selected === false}
                                onChange={() => onToggle(factor.id, false)}
                                className="accent-purple-600 size-4"
                            />
                            <span className="text-sm">No</span>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* Sub Factors */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${factor.selected && factor.subFactors && isExpanded ? "opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <Card className="ml-16 bg-white">
                    <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-medium">Select Macrofactors</h4>
                        {/* SELECT ALL */}
                        <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                            <Checkbox
                                checked={allSelected}
                                onCheckedChange={() => onSelectAllSubFactors(factor.id)}
                            />
                            <span className="text-sm font-medium">
                                Select All
                            </span>
                        </div>

                        <Separator />

                        {factor.subFactors?.map((subFactor) => (
                            <div key={subFactor} className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                                <Checkbox
                                    checked={factor.selectedSubFactors?.includes(subFactor) || false}
                                    onCheckedChange={() => onSubFactorToggle(factor.id, subFactor)}
                                />
                                <span className="text-sm">{subFactor}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MacroFactorItem;