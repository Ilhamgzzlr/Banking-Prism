// import { useState, useEffect } from "react";
// import { Plus, Trash2 } from "lucide-react";

// interface Level {
//   id: number;
//   name: string;
//   file: File | null;
// }

// interface CustomMacroeconomicScenariosProps {
//   onLevelsChange?: (levels: Level[]) => void;
// }

// export default function CustomMacroeconomicScenarios({ onLevelsChange }: CustomMacroeconomicScenariosProps) {
//   const [numLevelsInput, setNumLevelsInput] = useState<string>("");
//   const [levels, setLevels] = useState<Level[]>([
//     { id: 1, name: "", file: null }
//   ]);

//   useEffect(() => {
//     if (onLevelsChange) {
//       onLevelsChange(levels);
//     }
//   }, [levels, onLevelsChange]);

//   // Handle perubahan input Number of Levels
//   const handleNumLevelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setNumLevelsInput(value);

//     // Jika input kosong atau tidak valid, set levels ke 1 level default
//     if (value === "" || value === "0") {
//       setLevels([{ id: 1, name: "", file: null }]);
//       return;
//     }

//     const num = parseInt(value);

//     // Validasi: minimal 1
//     if (isNaN(num) || num < 1) {
//       setLevels([{ id: 1, name: "", file: null }]);
//       return;
//     }

//     const newLevels: Level[] = [];
//     for (let i = 0; i < num; i++) {
//       if (i < levels.length) {
//         newLevels.push(levels[i]);
//       } else {
//         newLevels.push({
//           id: i + 1,
//           name: "",
//           file: null
//         });
//       }
//     }
//     setLevels(newLevels);
//   };

//   const handleLevelNameChange = (id: number, value: string) => {
//     setLevels(levels.map(level =>
//       level.id === id ? { ...level, name: value } : level
//     ));
//   };

//   const handleFileChange = (id: number, file: File | null) => {
//     setLevels(levels.map(level =>
//       level.id === id ? { ...level, file } : level
//     ));
//   };

//   // Handle penambahan level manual
//   const handleAddLevel = () => {
//     const newLevel: Level = {
//       id: Math.max(...levels.map(l => l.id)) + 1,
//       name: "",
//       file: null
//     };

//     const newLevels = [...levels, newLevel];
//     setLevels(newLevels);
//     setNumLevelsInput(newLevels.length.toString());
//   };

//   // Handle penghapusan level
//   const handleRemoveLevel = (id: number) => {
//     const newLevels = levels.filter(l => l.id !== id);

//     const reindexedLevels = newLevels.map((level, index) => ({
//       ...level,
//       id: index + 1
//     }));

//     setLevels(reindexedLevels);
//     setNumLevelsInput(reindexedLevels.length > 0 ? reindexedLevels.length.toString() : "");
//   };


//   return (
//     <div className="space-y-6">
//       {/* Number of Levels */}
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//         <label className="block text-sm font-semibold text-gray-900 mb-2">
//           Number of Levels
//         </label>
//         <input
//           type="number"
//           min="1"
//           value={numLevelsInput}
//           onChange={handleNumLevelsChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//           placeholder="Example: 10"
//         />
//         {/* <p className="text-sm text-gray-500 mt-1">
//           {activeLevelsCount === 0 
//             ? "Default: 1 level will be shown below" 
//             : `Currently showing ${activeLevelsCount} level${activeLevelsCount > 1 ? 's' : ''}`}
//         </p> */}
//       </div>

//       {/* Levels Section */}
//       {levels.length > 0 && (
//         <div className="space-y-6">
//           {levels.map((level, index) => (
//             <div
//               key={level.id}
//               className="bg-gray-50 border border-gray-200 rounded-lg p-6"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="font-semibold text-gray-900">Level {index + 1}</h4>
//                 {levels.length > 1 && (
//                   <button
//                     onClick={() => handleRemoveLevel(level.id)}
//                     className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
//                     title="Remove level"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Scenario Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">
//                     Scenario Name
//                   </label>
//                   <input
//                     type="text"
//                     value={level.name}
//                     onChange={(e) => handleLevelNameChange(level.id, e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     placeholder="e.g., Moderate Downturn"
//                   />
//                 </div>

//                 {/* Upload Data File */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">
//                     Upload Data File
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <label className="cursor-pointer">
//                       <input
//                         type="file"
//                         className="hidden"
//                         accept=".xlsx,.xls,.csv"
//                         onChange={(e) =>
//                           handleFileChange(level.id, e.target.files?.[0] || null)
//                         }
//                       />
//                       <span className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
//                         Choose File
//                       </span>
//                     </label>
//                     <span className="text-sm text-gray-500">
//                       {level.file ? level.file.name : "no file selected"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add Level Button - selalu muncul karena tidak ada batas maksimum */}
//       <button
//         onClick={handleAddLevel}
//         className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
//       >
//         <Plus className="w-5 h-5" />
//         <span className="font-medium">Add Another Level</span>
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { FileUploadSection } from "../../common";
import { Download } from "lucide-react";

interface CustomMacroeconomicScenariosProps {
  onCustomFileChange?: (file: File | null) => void;
}

export default function CustomMacroeconomicScenarios({
  onCustomFileChange
}: CustomMacroeconomicScenariosProps) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    onCustomFileChange?.(file);
  }, [file, onCustomFileChange]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">
          Custom Macroeconomic Scenario
        </h4>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 h-10 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>
      </div>

      {/* Upload */}
      <FileUploadSection
        selectedFile={file}
        onFileSelect={setFile}
        acceptedTypes=".csv,.xls,.xlsx"
        required
      />
    </div>
  );
}
