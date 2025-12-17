import { useState, useEffect } from "react";
import {FileUploadSection} from "../../common"; // Sesuaikan path-nya

interface RegulatoryMacroeconomicScenariosProps {
    onFileChange?: (file: File | null) => void;
}

export default function RegulatoryMacroeconomicScenarios({ onFileChange }: RegulatoryMacroeconomicScenariosProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
    };

    useEffect(() => {
        if (onFileChange) {
            onFileChange(selectedFile);
        }
    }, [selectedFile, onFileChange]);

    return (
        <div className="space-y-3">
            {/* File Upload Section */}
            {/* <div> */}
                <h4 className="flex items-center font-semibold h-10">
                    Upload Regulatory Macroeconomic Scenarios File
                </h4>
                <FileUploadSection
                    acceptedTypes=".xlsx,.xls,.csv"
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    required={false}
                />
            {/* </div> */}
        </div>
    );
}