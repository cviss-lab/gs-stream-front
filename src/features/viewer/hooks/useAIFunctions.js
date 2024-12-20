import { useState, useCallback } from 'react';

export const useAIFunctions = () => {
  const [aiFunctions, setAiFunctions] = useState({
    measurement: false,
    segmentation: false,
  });

  const handleAiFunctionChange = useCallback((functionName) => {
    setAiFunctions((prev) => ({
      ...prev,
      [functionName]: !prev[functionName],
    }));
  }, []);

  return {
    aiFunctions,
    handleAiFunctionChange,
  };
};
