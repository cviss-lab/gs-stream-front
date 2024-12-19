import { useState, useCallback } from 'react';

export const useModelSelection = () => {
  const [selectedModelIds, setSelectedModelIds] = useState([]);

  const handleModelSelection = useCallback((modelId) => {
    setSelectedModelIds((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : prev.length < 2
          ? [...prev, modelId]
          : prev,
    );
  }, []);

  return {
    selectedModelIds,
    handleModelSelection,
  };
};
