import { TEST_MODELS_CAMERA_DATA } from '../__mocks__/cameraData';
import { TEST_MODELS_COMPONENT_DATA } from '../__mocks__/componentData';

export const getCameraDataById = (modelId) => {
  return (
    TEST_MODELS_CAMERA_DATA.find((cameraData) => cameraData.id === modelId)
      ?.cameraData || []
  );
};

export const getComponentDataById = (modelId) => {
  return (
    TEST_MODELS_COMPONENT_DATA.find((meshData) => meshData.id === modelId)
      ?.meshData || []
  );
};
