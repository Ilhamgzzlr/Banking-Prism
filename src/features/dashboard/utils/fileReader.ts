// utils/fileReader.ts
import * as XLSX from 'xlsx';

export const getFileColumns = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          resolve([]);
          return;
        }

        let columns: string[] = [];

        if (file.name.endsWith('.csv')) {
          // Handle CSV
          const text = data as string;
          const lines = text.split('\n');
          if (lines.length > 0) {
            columns = lines[0].split(',').map(col => col.trim());
          }
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          // Handle Excel
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const range = XLSX.utils.decode_range(firstSheet['!ref'] || 'A1');
          
          // Get column headers from first row
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
            const cell = firstSheet[cellAddress];
            if (cell && cell.v) {
              columns.push(String(cell.v));
            }
          }
        }

        resolve(columns);
      } catch (error) {
        console.error('Error reading file columns:', error);
        resolve([]);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  });
};