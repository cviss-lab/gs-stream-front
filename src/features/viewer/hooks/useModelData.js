import { useMemo, useState, useEffect } from 'react';
import { TEST_MODELS } from '__mocks__/models';

export const useModelData = (backendAddress, isStandalone) => {
  const getWebglModelUrl = useMemo(
    () => (modelId) => {
      if (isStandalone) {
        const model = TEST_MODELS.find((model) => model.id === modelId);
        return model
          ? `${process.env.PUBLIC_URL}/test-models/${model.file}`
          : null;
      }
      return `${backendAddress}/api/assets/splat/${modelId}`;
    },
    [backendAddress, isStandalone],
  );

  const [allModels, setAllModels] = useState([]);

  useEffect(() => {
    if (isStandalone) {
      setAllModels(TEST_MODELS);
      return;
    }

    const intervalId = setInterval(() => {
      fetch(`${backendAddress}/api/assets/splat/list`)
        .then((response) => response.json())
        .then((data) => {
          if (JSON.stringify(data) !== JSON.stringify(allModels)) {
            setAllModels(data);
          }
        })
        .catch((error) => {
          console.error('Fetching data failed', error);
          setAllModels([]);
        });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [allModels, backendAddress, isStandalone]);

  return {
    allModels,
    getWebglModelUrl,
  };
};
