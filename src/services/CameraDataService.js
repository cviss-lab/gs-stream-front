import { TEST_MODELS_CAMERA_DATA } from '../__mocks__/cameraData';

export const getCameraDataById = (modelId) => {
  return (
    TEST_MODELS_CAMERA_DATA.find((cameraData) => cameraData.id === modelId)
      ?.cameraData || []
  );
};
