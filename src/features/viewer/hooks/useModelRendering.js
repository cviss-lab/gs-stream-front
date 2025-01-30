import { useMemo } from 'react';
import { DEFAULT_VIEW_SETTINGS } from '../constants/viewerSettings';
import { getCameraDataById } from 'services/CameraDataService';

const createModelRenderSettings = (model, viewSettings) => {
  return {
    camera: model.viewSettings?.camera
      ? {
          position: viewSettings.camera.position,
          rotation: viewSettings.camera.rotation,
          fov: viewSettings.camera.fov,
          near: viewSettings.camera.near,
          far: viewSettings.camera.far,
        }
      : DEFAULT_VIEW_SETTINGS.cameraSettings,
    model: {
      position:
        viewSettings.modelPosition || DEFAULT_VIEW_SETTINGS.modelPosition,
      maxPan: {
        x: viewSettings.maxPanX || DEFAULT_VIEW_SETTINGS.maxPanX,
        y: viewSettings.maxPanY || DEFAULT_VIEW_SETTINGS.maxPanY,
        z: viewSettings.maxPanZ || DEFAULT_VIEW_SETTINGS.maxPanZ,
      },
    },
  };
};

export const useModelRendering = (
  selectedModelIds,
  allModels,
  getWebglModelUrl,
) => {
  const selectedModels = useMemo(() => {
    return selectedModelIds
      .map((id) => {
        const model = allModels.find((m) => m.id === id);
        if (!model) return null;

        const viewSettings = model.viewSettings || DEFAULT_VIEW_SETTINGS;
        return {
          id: model.id,
          splatUrl: getWebglModelUrl(model.id),
          renderSettings: createModelRenderSettings(model, viewSettings),
          cameraData: model.hasCameraData ? getCameraDataById(model.id) : null,
        };
      })
      .filter(Boolean);
  }, [selectedModelIds, allModels, getWebglModelUrl]);

  return { selectedModels };
};
