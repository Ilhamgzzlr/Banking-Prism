import { Download } from "lucide-react";

interface ModelCardProps {
  id: string;
  name: string;
  description?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDownload: (id: string) => void;
  stats?: {
    accuracy?: string;
    mse?: string;
    rmse?: string;
  };
}

const ModelCard = ({
  id,
  name,
  description,
  isSelected,
  onSelect,
  onDownload,
  stats
}: ModelCardProps) => {
  return (
    <div
      className={`flex items-center justify-between bg-white border rounded-lg transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <label className="flex items-center gap-3 cursor-pointer flex-1 p-6">
        <input
          type="radio"
          name="lgd_model"
          checked={isSelected}
          onChange={() => onSelect(id)}
          className="w-4 h-4 text-blue-600"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              {name}
            </span>
          </div>
          
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          
          {stats && (
            <div className="flex gap-4 mt-2">
              {stats.accuracy && (
                <div className="text-xs">
                  <span className="text-gray-500">Accuracy: </span>
                  <span className="font-medium text-green-600">{stats.accuracy}</span>
                </div>
              )}
              {stats.mse && (
                <div className="text-xs">
                  <span className="text-gray-500">MSE: </span>
                  <span className="font-medium text-blue-600">{stats.mse}</span>
                </div>
              )}
              {stats.rmse && (
                <div className="text-xs">
                  <span className="text-gray-500">RMSE: </span>
                  <span className="font-medium text-purple-600">{stats.rmse}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </label>

      <button
        onClick={() => onDownload(id)}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors ml-2"
        title="Download model details"
        type="button"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ModelCard;