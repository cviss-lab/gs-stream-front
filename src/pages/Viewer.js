// React related imports
import React, { useState, useMemo } from 'react';

// Component imports
import CameraControlPanel from 'features/viewer/components/CameraControlPanel';
import ControlPanel from 'features/viewer/components/ControlPanel';
import RenderArea from 'features/viewer/components/RenderArea';
import TopNavigation from 'features/viewer/components/TopNavigation';

// Constants
import { DEFAULT_VIEW_SETTINGS } from 'features/viewer/constants/viewerSettings';
import { TEST_MODELS } from '__mocks__/models';

// Custom hooks
import { useCameraControls } from 'features/viewer/hooks/useCameraControls';
import { useModelData } from 'features/viewer/hooks/useModelData';

// Helper functions
const handleMove = (axis, direction, refs) => {
  refs.forEach((ref) => {
    if (ref.current) ref.current.move(axis, direction);
  });
};

const handleRotate = (axis, direction, refs) => {
  refs.forEach((ref) => {
    if (ref.current) ref.current.rotate(axis, direction);
  });
};

function UnifiedCsrView() {
  const [selectedModelIds, setSelectedModelIds] = useState([]);
  const [aiFunctions, setAiFunctions] = useState({
    measurement: false,
    annotation: false,
    segmentation: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [delta, setDelta] = useState(DEFAULT_VIEW_SETTINGS.delta);
  const [rotationDelta, setRotationDelta] = useState(
    DEFAULT_VIEW_SETTINGS.rotationDelta,
  );
  const [showDrone, setShowDrone] = useState(false);

  // Check if running in standalone mode
  const isStandalone = process.env.REACT_APP_STANDALONE === 'true';
  const backendAddress = isStandalone ? '' : process.env.REACT_APP_BACKEND_URL;

  const { allModels } = useModelData(backendAddress, isStandalone);
  const { cameraControlsRef1, cameraControlsRef2, handleResetCamera } =
    useCameraControls();

  const getWebglModelUrl = (modelId) => {
    if (isStandalone) {
      const model = TEST_MODELS.find((model) => model.id === modelId);
      return model
        ? `${process.env.PUBLIC_URL}/test-models/${model.file}`
        : null;
    }
    return `${backendAddress}/api/assets/splat/${modelId}`;
  };

  const handleModelSelection = (modelId) => {
    setSelectedModelIds((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : prev.length < 2
          ? [...prev, modelId]
          : prev,
    );
  };

  const handleAiFunctionChange = (functionName) => {
    setAiFunctions((prev) => ({
      ...prev,
      [functionName]: !prev[functionName],
    }));
  };

  const selectedModels = useMemo(() => {
    return selectedModelIds
      .map((id) => {
        const model = allModels.find((m) => m.id === id);
        if (!model) return null;

        const viewSettings = model.viewSettings || DEFAULT_VIEW_SETTINGS;
        return {
          id: model.id,
          splatUrl: getWebglModelUrl(model.id),
          renderSettings: {
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
                viewSettings.modelPosition ||
                DEFAULT_VIEW_SETTINGS.modelPosition,
              maxPan: {
                x: viewSettings.maxPanX || DEFAULT_VIEW_SETTINGS.maxPanX,
                y: viewSettings.maxPanY || DEFAULT_VIEW_SETTINGS.maxPanY,
                z: viewSettings.maxPanZ || DEFAULT_VIEW_SETTINGS.maxPanZ,
              },
            },
          },
        };
      })
      .filter(Boolean);
  }, [selectedModelIds, allModels]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopNavigation />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <ControlPanel
          selectedModelIds={selectedModelIds}
          onModelSelection={handleModelSelection}
          aiFunctions={aiFunctions}
          onAiFunctionChange={handleAiFunctionChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          allModels={allModels}
          showDrone={showDrone}
          setShowDrone={setShowDrone}
        />
        <div className="flex-1 p-4 flex flex-col">
          <RenderArea
            selectedModels={selectedModels}
            cameraControlsRef1={cameraControlsRef1}
            cameraControlsRef2={cameraControlsRef2}
            delta={delta}
            rotationDelta={rotationDelta}
            showDrone={showDrone}
          />
          {selectedModelIds.length > 0 && (
            <CameraControlPanel
              delta={delta}
              setDelta={setDelta}
              rotationDelta={rotationDelta}
              setRotationDelta={setRotationDelta}
              handleMove={handleMove}
              handleRotate={handleRotate}
              handleResetCamera={handleResetCamera}
              cameraControlsRef1={cameraControlsRef1}
              cameraControlsRef2={cameraControlsRef2}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UnifiedCsrView;
