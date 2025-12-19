import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ParameterInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "percentage";
  required?: boolean;
  className?: string;
  options?: { label: string; value: string }[];
}

const ParameterInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "number",
  required = false,
  className = "",
  options
}: ParameterInputProps) => {

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>

      {options ? (
        // ✅ SELECT (shadcn)
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={name} className={className}>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>

          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        // ✅ INPUT (shadcn)
        <Input
          id={name}
          type={type === "percentage" ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            type === "number" &&
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            className
          )}
        />
      )}
    </div>
  );
};

export default ParameterInput;