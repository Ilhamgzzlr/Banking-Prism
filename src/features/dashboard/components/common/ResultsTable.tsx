interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  width?: string;
  format?: (value: any) => string;
}

interface ResultsTableProps {
  data: any[];
  columns: TableColumn[] | readonly TableColumn[];
  title?: string;
  className?: string;
}

const ResultsTable = ({
  data,
  columns,
  title,
  className = ""
}: ResultsTableProps) => {
  const formatValue = (value: any, column: TableColumn) => {
    if (column.format) {
      return column.format(value);
    }
    
    // Format numeric values
    if (typeof value === 'number') {
      // Format percentages
      if (column.key.includes('pct') || column.key.includes('ratio')) {
        return `${(value * 100).toFixed(2)}%`;
      }
      // Format large numbers
      if (value >= 1000) {
        return value.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      }
      // Format decimals
      return value.toFixed(4);
    }
    
    return value;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      {title && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        </div>
      )}
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-3 py-2 font-semibold text-gray-900 border border-gray-200 ${
                  column.align === 'right' ? 'text-right' :
                  column.align === 'center' ? 'text-center' : 'text-left'
                }`}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
            >
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className={`px-3 py-2 border border-gray-200 ${
                    column.align === 'right' ? 'text-right' :
                    column.align === 'center' ? 'text-center' : 'text-left'
                  } ${column.key.includes('scenario') ? 'font-medium' : 'text-gray-700'}`}
                >
                  {formatValue(row[column.key], column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;