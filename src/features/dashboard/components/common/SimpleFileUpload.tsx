
interface SimpleFileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  accept?: string;
}

const SimpleFileUpload = ({
  label,
  onFileSelect,
  selectedFile,
  accept = ".xlsx,.xls,.csv"
}: SimpleFileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      
      {!selectedFile ? (
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
          <span className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
            Choose File
          </span>
        </label>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm text-gray-700 truncate max-w-xs">
              {selectedFile.name}
            </span>
            <span className="text-xs text-gray-500">
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleFileUpload;