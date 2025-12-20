import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-sm text-gray-600">
        Running stress test calculation...
      </p>

      <div className="w-full max-w-3xl space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
