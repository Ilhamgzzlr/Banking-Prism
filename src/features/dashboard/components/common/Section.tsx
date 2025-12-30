import { Download } from "lucide-react";
import { downloadTemplate } from "@features/dashboard/utils/downloadTemplate";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface SectionProps {
  title: string;
  isDownloadTemplate?: boolean;
  templatePath?: string;
  templateFileName?: string;
  children?: React.ReactNode;
  required?: boolean;
  downloadName?: string;
  className?: string;
}

const Section = ({
  title,
  children,
  required = false,
  isDownloadTemplate = false,
  templatePath,
  templateFileName,
  downloadName,
  className,
}: SectionProps) => {

  const handleDownload = () => {
    if (!templatePath || !templateFileName) {
      toast.error("Template not available");
      return;
    }

    try {
      downloadTemplate(templatePath, templateFileName);

      toast.success(downloadName ? `${downloadName} downloaded` : "Template downloaded", {
        description: templateFileName,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to download template");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold mb-3 ${className}`}>
          {title} {required && <span className="text-red-500">*</span>}
        </h3>
        {isDownloadTemplate && templatePath && (
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={handleDownload}
            className={`mb-3 ${className}`}
          >
            <Download className="w-4 h-4" />
            {downloadName ? `${downloadName}` : "Download Template"}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Section;