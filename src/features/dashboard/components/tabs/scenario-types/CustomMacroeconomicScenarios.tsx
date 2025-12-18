import { useEffect, useState } from "react";
import { FileUploadSection, Section } from "../../common";

interface CustomMacroeconomicScenariosProps {
  onCustomFileChange?: (file: File | null) => void;
  templatePath?: string;
  templateFileName?: string;
}

export default function CustomMacroeconomicScenarios({
  onCustomFileChange,
  templatePath,
  templateFileName
}: CustomMacroeconomicScenariosProps) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    onCustomFileChange?.(file);
  }, [file, onCustomFileChange]);

  return (
    <Section
      title="Upload Custom Macroeconomic Scenario File"
      required
      isDownloadTemplate={!!templatePath}
      templatePath={templatePath}
      templateFileName={templateFileName}
    >
      <FileUploadSection
        selectedFile={file}
        onFileSelect={setFile}
        acceptedTypes=".csv,.xls,.xlsx"
        required
      />
    </Section>
  );
}
