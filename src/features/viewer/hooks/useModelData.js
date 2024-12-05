import { useState, useEffect } from 'react';
export const useModelData = (backendCsrAddress) => {
  const [allModels, setAllModels] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${backendCsrAddress}/api/assets/splat/list`)
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
  }, [allModels, backendCsrAddress]);

  return { allModels };
};
