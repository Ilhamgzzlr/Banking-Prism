import { useState, useEffect } from "react";
import { FileUploadSection, Section } from "../../common"; // Sesuaikan path-nya

interface RegulatoryMacroeconomicScenariosProps {
    onFileChange?: (file: File | null) => void;
    templatePath?: string;
    templateFileName?: string;
}

export default function RegulatoryMacroeconomicScenarios({ onFileChange, templatePath, templateFileName }: RegulatoryMacroeconomicScenariosProps) {
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
        <Section
            title="Upload Regulatory Macroeconomic Scenarios File"
            required
            isDownloadTemplate={!!templatePath}
            templatePath={templatePath}
            templateFileName={templateFileName}
        >
            <FileUploadSection
                acceptedTypes=".xlsx,.xls,.csv"
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                required={false}
            />
        </Section>
    );
}