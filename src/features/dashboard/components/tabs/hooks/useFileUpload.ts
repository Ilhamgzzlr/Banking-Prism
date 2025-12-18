import { useState } from "react";
import { getFileColumns } from "@/features/dashboard/utils/fileReader";

interface FileUploadState {
  stressTest: File | null;
  macroeconomic: File | null;
}

interface FileColumnsState {
  stressTest: string[];
  macroeconomic: string[];
}

interface UseFileUploadReturn {
  files: FileUploadState;
  fileColumns: FileColumnsState;
  handleFileSelect: (
    type: keyof FileUploadState,
    file: File | null
  ) => Promise<void>;
  handleRemoveFile: (type: keyof FileUploadState) => void;
  resetFiles: () => void;
  getTotalFileSize: () => number;
  hasFiles: boolean;
}

export const useFileUpload = (
  initialState: FileUploadState = {
    stressTest: null,
    macroeconomic: null
  }
): UseFileUploadReturn => {
  const [files, setFiles] = useState<FileUploadState>(initialState);

  const [fileColumns, setFileColumns] = useState<FileColumnsState>({
    stressTest: [],
    macroeconomic: []
  });

  /**
   * HANDLE FILE SELECT
   */
  const handleFileSelect = async (type: keyof FileUploadState, file: File | null) => {
    if (!file) return;

    let columns: string[] = [];

    try {
      columns = await getFileColumns(file);
    } catch (e) {
      console.error(e);
    }

    setFiles(prev => ({ ...prev, [type]: file }));

    setFileColumns(prev => ({
      ...prev,
      [type]: columns
    }));
  };


  /**
   * REMOVE FILE (explicit)
   */
  const handleRemoveFile = (type: keyof FileUploadState) => {
    setFiles(prev => ({ ...prev, [type]: null }));
    setFileColumns(prev => ({ ...prev, [type]: [] }));
  };

  /**
   * RESET ALL
   */
  const resetFiles = () => {
    setFiles({
      stressTest: null,
      macroeconomic: null
    });
    setFileColumns({
      stressTest: [],
      macroeconomic: []
    });
  };

  /**
   * TOTAL FILE SIZE
   */
  const getTotalFileSize = () => {
    let total = 0;
    if (files.stressTest) total += files.stressTest.size;
    if (files.macroeconomic) total += files.macroeconomic.size;
    return total;
  };

  return {
    files,
    fileColumns,
    handleFileSelect,
    handleRemoveFile,
    resetFiles,
    getTotalFileSize,
    hasFiles: !!files.stressTest || !!files.macroeconomic
  };
};
