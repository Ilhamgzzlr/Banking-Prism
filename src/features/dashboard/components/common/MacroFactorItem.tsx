import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

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
                                {isExpanded ? "−" : "+"}
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
            {factor.selected && factor.subFactors && isExpanded && (
                <Card className="ml-16 bg-muted/20">
                    <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                            Select Macrofactors
                        </h4>

                        {factor.subFactors.map((subFactor) => (
                            <div
                                key={subFactor}
                                className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
                            >
                                <Checkbox
                                    checked={
                                        factor.selectedSubFactors?.includes(subFactor) || false
                                    }
                                    onCheckedChange={() =>
                                        onSubFactorToggle(factor.id, subFactor)
                                    }
                                />
                                <span className="text-sm">{subFactor}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default MacroFactorItem;