// React related imports
import React, { useState } from 'react';

// Component imports
import CameraControlPanel from 'features/viewer/components/controls/CameraControlPanel';
import ControlPanel from 'features/viewer/components/controls/ControlPanel';
import RenderArea from 'features/viewer/components/render/RenderArea';
import TopNavigation from 'features/viewer/components/controls/TopNavigation';

// Constants
import { DEFAULT_VIEW_SETTINGS } from 'features/viewer/constants/viewerSettings';

// Custom hooks
import { useCameraControls } from 'features/viewer/hooks/useCameraControls';
import { useModelData } from 'features/viewer/hooks/useModelData';
import { useModelSelection } from 'features/viewer/hooks/useModelSelection';
import { useAIFunctions } from 'features/viewer/hooks/useAIFunctions';
import { useModelRendering } from 'features/viewer/hooks/useModelRendering';

function Viewer() {
  // Check if running in standalone mode
  const isStandalone = process.env.REACT_APP_STANDALONE === 'true';
  const backendAddress = isStandalone ? '' : process.env.REACT_APP_BACKEND_URL;

  const { selectedModelIds, handleModelSelection } = useModelSelection();
  const { aiFunctions, handleAiFunctionChange } = useAIFunctions();
  const { allModels, getWebglModelUrl } = useModelData(
    backendAddress,
    isStandalone,
  );
  const { selectedModels } = useModelRendering(
    selectedModelIds,
    allModels,
    getWebglModelUrl,
  );

  const [viewSettings, setViewSettings] = useState(DEFAULT_VIEW_SETTINGS);

  const updateViewSettings = (key, value) => {
    setViewSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const {
    cameraControlsRef1,
    cameraControlsRef2,
    handleMove,
    handleRotate,
    handleResetCamera,
  } = useCameraControls();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopNavigation />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <ControlPanel
          selectedModelIds={selectedModelIds}
          onModelSelection={handleModelSelection}
          aiFunctions={aiFunctions}
          onAiFunctionChange={handleAiFunctionChange}
          searchTerm={viewSettings.searchTerm}
          setSearchTerm={(value) => updateViewSettings('searchTerm', value)}
          allModels={allModels}
          showDrone={viewSettings.showDrone}
          setShowDrone={(value) => updateViewSettings('showDrone', value)}
        />
        <div className="flex-1 p-4 flex flex-col">
          <RenderArea
            selectedModels={selectedModels}
            cameraControlsRef1={cameraControlsRef1}
            cameraControlsRef2={cameraControlsRef2}
            delta={viewSettings.delta}
            rotationDelta={viewSettings.rotationDelta}
            showDrone={viewSettings.showDrone}
          />
          {selectedModelIds.length > 0 && (
            <CameraControlPanel
              delta={viewSettings.delta}
              setDelta={(value) => updateViewSettings('delta', value)}
              rotationDelta={viewSettings.rotationDelta}
              setRotationDelta={(value) =>
                updateViewSettings('rotationDelta', value)
              }
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

export default Viewer;
