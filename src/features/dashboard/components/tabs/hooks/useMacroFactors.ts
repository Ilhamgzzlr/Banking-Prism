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

export const useMacroFactors = (customFactors?: MacroFactor[]) => {
    const [factors, setFactors] = useState<MacroFactor[]>(
        customFactors || DEFAULT_MACRO_FACTORS
    );
    const [percentiles, setPercentiles] = useState({
        level1: "",
        level2: ""
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

    const handlePercentileChange = (level: 'level1' | 'level2', value: string) => {
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

    const showPercentileSection = factors.filter(f => f.id !== "PD_A").some(f => f.selected);

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

        const level1 = parseFloat(percentiles.level1);
        const level2 = parseFloat(percentiles.level2);

        if (isNaN(level1) || isNaN(level2)) {
            return false;
        }

        return level1 >= 0.1 && level1 <= 99.9 && level2 >= 0.1 && level2 <= 99.9;
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