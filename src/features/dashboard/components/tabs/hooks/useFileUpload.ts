import { useState } from 'react';
import { getFileColumns } from '@/features/dashboard/utils/fileReader';

interface FileUploadState {
  stressTest: File | null;
  macroeconomic: File | null;
}

interface UseFileUploadReturn {
  files: FileUploadState;
  fileColumns: {
    macroeconomic: string[];
  };
  handleFileSelect: (type: keyof FileUploadState, file: File | null) => Promise<void>;
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
  const [fileColumns, setFileColumns] = useState<{
    macroeconomic: string[];
  }>({
    macroeconomic: []
  });

  const handleFileSelect = async (type: keyof FileUploadState, file: File | null) => {
    if (file) {
      let columns: string[] = [];

      if (type === 'macroeconomic') {
        try {
          columns = await getFileColumns(file);
        } catch (error) {
          console.error('Error reading file columns:', error);
          columns = [];
        }
      }

      setFiles(prev => ({
        ...prev,
        [type]: file
      }));

      if (type === 'macroeconomic') {
        setFileColumns(prev => ({
          ...prev,
          macroeconomic: columns
        }));
      }
    } else {
      setFiles(prev => ({
        ...prev,
        [type]: null
      }));

      if (type === 'macroeconomic') {
        setFileColumns(prev => ({
          ...prev,
          macroeconomic: []
        }));
      }
    }
  };

  const handleRemoveFile = (type: keyof FileUploadState) => {
    setFiles(prev => ({
      ...prev,
      [type]: null
    }));

    if (type === 'macroeconomic') {
      setFileColumns(prev => ({
        ...prev,
        macroeconomic: []
      }));
    }
  };

  const resetFiles = () => {
    setFiles({
      stressTest: null,
      macroeconomic: null
    });
    setFileColumns({
      macroeconomic: []
    });
  };

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