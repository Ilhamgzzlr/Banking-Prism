import { useState } from 'react';
import { DEFAULT_MACRO_FACTORS } from '../data/macroFactorConfig';

export interface MacroFactor {
    id: string;
    name: string;
    selected: boolean;
    subFactors?: string[];
    selectedSubFactors?: string[];
    description?: string;
}

export const useMacroFactors = (customFactors?: MacroFactor[], noMacroPercentile?: string[] | null) => {
    const [factors, setFactors] = useState<MacroFactor[]>(
        customFactors || DEFAULT_MACRO_FACTORS
    );
    const [percentiles, setPercentiles] = useState<Record<string, string>>(() => {
        // If we have saved percentiles, restore them
        if (noMacroPercentile && noMacroPercentile.length > 0) {
            const restored: Record<string, string> = {};
            noMacroPercentile.forEach((value, index) => {
                restored[`level${index + 1}`] = value;
            });
            return restored;
        }
        // Default to two levels
        return {
            level1: "",
            level2: ""
        };
    });

    const handleFactorToggle = (id: string, value: boolean) => {
        setFactors(factors.map(factor =>
            factor.id === id
                ? {
                    ...factor,
                    selected: value,
                    selectedSubFactors: value ? [] : undefined
                }
                : factor
        ));
    };

    const handleSubFactorToggle = (factorId: string, subFactor: string) => {
        setFactors(factors.map(factor => {
            if (factor.id === factorId && factor.selectedSubFactors) {
                const isSelected = factor.selectedSubFactors.includes(subFactor);
                return {
                    ...factor,
                    selectedSubFactors: isSelected
                        ? factor.selectedSubFactors.filter(sf => sf !== subFactor)
                        : [...factor.selectedSubFactors, subFactor]
                };
            }
            return factor;
        }));
    };

    const handlePercentileChange = (level: string, value: string) => {
        setPercentiles(prev => ({
            ...prev,
            [level]: value
        }));
    };

    const getSelectedFactors = () => {
        return factors.filter(f => f.selected);
    };

    const getSelectedSubFactors = (factorId: string) => {
        const factor = factors.find(f => f.id === factorId);
        return factor?.selectedSubFactors || [];
    };

    const showPercentileSection =
        !noMacroPercentile || noMacroPercentile.length === 0;



    const resetSelection = () => {
        setFactors(factors.map(factor => ({
            ...factor,
            selected: false,
            selectedSubFactors: []
        })));
        setPercentiles({ level1: "", level2: "" });
    };

    const validatePercentiles = () => {
        if (!showPercentileSection) return true;

        const values = Object.values(percentiles);

        const filledValues = values.filter(v => v && v.trim() !== "");
        if (filledValues.length === 0) return false;

        // Validate all filled percentiles
        for (const value of filledValues) {
            const num = parseFloat(value);
            if (isNaN(num) || num < 0.1 || num > 99.9) {
                return false;
            }
        }

        return true;
    };

    return {
        factors,
        percentiles,
        handleFactorToggle,
        handleSubFactorToggle,
        handlePercentileChange,
        getSelectedFactors,
        getSelectedSubFactors,
        showPercentileSection,
        resetSelection,
        validatePercentiles,
        setFactors,
        setPercentiles
    };
};