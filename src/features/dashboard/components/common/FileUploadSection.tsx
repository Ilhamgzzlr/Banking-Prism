import { Upload } from "lucide-react";
import { useState } from "react";

interface FileUploadSectionProps {
  title?: string;
  acceptedTypes?: string;
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  required?: boolean;
}

const FileUploadSection = ({
  acceptedTypes = ".xlsx,.xls,.csv",
  onFileSelect,
  selectedFile,
}: FileUploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = acceptedTypes.split(',').map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (validTypes.includes(fileExtension)) {
        onFileSelect(file);
      } else {
        alert('Please upload CSV, XLS, or XLSX files only');
      }
    }
  };

  return (
    <div className="mb-6">   
      {!selectedFile && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 group hover:border-purple-500 border-dashed rounded-lg transition-colors duration-300 ${
            isDragging 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-300 bg-gray-50'
          }`}
        >
          <label className="flex flex-col items-center cursor-pointer p-12">
            <input
              type="file"
              className="hidden"
              accept={acceptedTypes}
              onChange={handleFileChange}
            />
            <div className="mb-4 p-4 bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300 rounded-full">
              <Upload className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-base text-gray-700 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              CSV, XLS, or XLSX files only
            </p>
          </label>
        </div>
      )}

      {selectedFile && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Remove file"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;