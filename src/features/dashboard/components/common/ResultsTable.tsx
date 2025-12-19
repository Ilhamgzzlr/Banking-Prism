import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

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

  const alignClass = (align?: string) =>
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left"

  return (
    <div className={cn("overflow-x-auto space-y-2", className)}>
      {title && (
        <h4 className="text-sm font-medium text-muted-foreground">
          {title}
        </h4>
      )}

      <Table className="text-xs">
        <TableHeader>
          <TableRow className="bg-neutral-300 hover:bg-neutral-300">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  "font-semibold text-blue",
                  alignClass(column.align)
                )}
                style={{ width: column.width }}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                rowIndex % 2 === 0 ? "bg-background" : "bg-muted/30",
                "hover:bg-muted"
              )}
            >
              {columns.map((column) => (
                <TableCell
                  key={`${rowIndex}-${column.key}`}
                  className={cn(
                    alignClass(column.align),
                    column.key.includes("scenario")
                      ? "font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {formatValue(row[column.key], column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultsTable;