import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { MacroeconomicInfoModal } from "../../common";


interface Level {
  id: number;
  name: string;
  percentile: number;
}

interface MacroeconomicScenarioGeneratorProps {
  onLevelsChange?: (levels: Level[]) => void;
}

export default function MacroeconomicScenarioGenerator({ onLevelsChange }: MacroeconomicScenarioGeneratorProps) {
  const [numLevelsInput, setNumLevelsInput] = useState<string>("");
  const [levels, setLevels] = useState<Level[]>([
    { id: 1, name: "", percentile: 95 }
  ]);

  const [showInfoModal, setShowInfoModal] = useState(true);


  useEffect(() => {
    if (onLevelsChange) {
      onLevelsChange(levels);
    }
  }, [levels, onLevelsChange]);

  const handleNumLevelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumLevelsInput(value);

    // Jika input kosong atau tidak valid, set levels ke 1 level default
    if (value === "" || value === "0") {
      setLevels([{ id: 1, name: "", percentile: 95 }]);
      return;
    }

    const num = parseInt(value);

    // Validasi: minimal 1
    if (isNaN(num) || num < 1) {
      setLevels([{ id: 1, name: "", percentile: 95 }]);
      return;
    }

    // Tidak ada batasan maksimum, langsung gunakan nilai input
    const newLevels: Level[] = [];
    for (let i = 0; i < num; i++) {
      if (i < levels.length) {
        newLevels.push(levels[i]);
      } else {
        newLevels.push({
          id: i + 1,
          name: "",
          percentile: 95
        });
      }
    }
    setLevels(newLevels);
  };

  const handleLevelNameChange = (id: number, value: string) => {
    setLevels(levels.map(level =>
      level.id === id ? { ...level, name: value } : level
    ));
  };

  const handlePercentileChange = (id: number, value: string) => {
    const percentile = parseInt(value) || 0;
    const clampedPercentile = Math.max(0, Math.min(100, percentile));
    setLevels(levels.map(level =>
      level.id === id ? { ...level, percentile: clampedPercentile } : level
    ));
  };

  // Handle penambahan level manual
  const handleAddLevel = () => {
    const newLevel: Level = {
      id: Math.max(...levels.map(l => l.id)) + 1,
      name: "",
      percentile: 95
    };

    const newLevels = [...levels, newLevel];
    setLevels(newLevels);
    setNumLevelsInput(newLevels.length.toString());
  };

  // Handle penghapusan level
  const handleRemoveLevel = (id: number) => {
    const newLevels = levels.filter(l => l.id !== id);

    // Reset ID agar tetap berurutan
    const reindexedLevels = newLevels.map((level, index) => ({
      ...level,
      id: index + 1
    }));

    setLevels(reindexedLevels);
    setNumLevelsInput(reindexedLevels.length > 0 ? reindexedLevels.length.toString() : "");
  };

  // Hitung jumlah level yang aktif untuk ditampilkan
  //   const activeLevelsCount = levels.length;

  return (
    <div className="space-y-6">

      <MacroeconomicInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
      {/* Number of Levels */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Number of Levels
        </label>
        <input
          type="number"
          min="1"
          value={numLevelsInput}
          onChange={handleNumLevelsChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Example: 10"
        />
        {/* <p className="text-sm text-gray-500 mt-1">
          {activeLevelsCount === 0 
            ? "Default: 1 level will be shown below" 
            : `Currently showing ${activeLevelsCount} level${activeLevelsCount > 1 ? 's' : ''}`}
        </p> */}
      </div>

      {/* Levels */}
      <div className="space-y-6">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Level {index + 1}</h4>
              {levels.length > 1 && (
                <button
                  onClick={() => handleRemoveLevel(level.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove level"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scenario Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Scenario Name
                </label>
                <input
                  type="text"
                  value={level.name}
                  onChange={(e) => handleLevelNameChange(level.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Moderate Downturn"
                />
              </div>

              {/* Percentile */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Percentile (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={level.percentile}
                  onChange={(e) => handlePercentileChange(level.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., 95"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Level Button - selalu muncul karena tidak ada batas maksimum */}
      <button
        onClick={handleAddLevel}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Another Level</span>
      </button>
    </div>
  );
}