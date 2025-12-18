import { Download } from "lucide-react";
import { downloadTemplate } from "@features/dashboard/utils/downloadTemplate";

interface SectionProps {
  title: string;
  isDownloadTemplate?: boolean;
  templatePath?: string;
  templateFileName?: string;
  children?: React.ReactNode;
  required?: boolean;
}

const Section = ({
  title,
  children,
  required = false,
  isDownloadTemplate = false,
  templatePath,
  templateFileName
}: SectionProps) => {

  const handleDownload = () => {
    if (templatePath && templateFileName) {
      downloadTemplate(templatePath, templateFileName);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold mb-3">
          {title} {required && <span className="text-red-500">*</span>}
        </h3>
        {isDownloadTemplate && templatePath  && (
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 h-10 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 mb-3"
          >
            <Download className="w-4 h-4" />
            Download Template
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Section;