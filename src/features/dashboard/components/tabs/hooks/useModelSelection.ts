import { useState } from 'react';
import { DEFAULT_MODELS } from '../data/modelConfig';

export interface Model {
  id: string;
  name: string;
}

export const useModelSelection = (
  initialModelId: string = "",
  customModels?: Model[]
) => {
  const [selectedModelId, setSelectedModelId] = useState<string>(initialModelId);

  const models = customModels || DEFAULT_MODELS;

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId);
  };

  const handleDownload = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model) {
      // Implement download logic here
      console.log(`Downloading model: ${model.name}`);
      
      // Example: Create a download link
      const link = document.createElement('a');
      link.href = `#`; // Replace with actual download URL
      link.download = `${model.name}.json`;
      link.click();
    }
  };

  const isModelSelected = () => {
    return selectedModelId !== "";
  };

  return {
    models,
    selectedModelId,
    handleModelSelect,
    handleDownload,
    isModelSelected,
  };
};