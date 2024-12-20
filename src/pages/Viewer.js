// React related imports
import React, { useState } from 'react';

// Component imports
import CameraControlPanel from 'features/viewer/components/controls/panels/CameraControlPanel';
import ControlPanel from 'features/viewer/components/controls/panels/ControlPanel';
import RenderArea from 'features/viewer/components/viewport/render/RenderArea';

// Custom hooks
import { useCameraControls } from 'features/viewer/hooks/useCameraControls';
import { useModelData } from 'features/viewer/hooks/useModelData';
import { useModelSelection } from 'features/viewer/hooks/useModelSelection';
import { useAIFunctions } from 'features/viewer/hooks/useAIFunctions';
import { useModelRendering } from 'features/viewer/hooks/useModelRendering';
import { useViewSettings } from 'features/viewer/hooks/useViewSettings';

// Layout imports
import { ViewerLayout } from 'features/viewer/components/layouts/ViewerLayout';

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

  const {
    displaySettings,
    cameraSettings,
    updateDisplaySettings,
    updateCameraSettings,
  } = useViewSettings();

  const {
    cameraControlsRef1,
    cameraControlsRef2,
    handleMove,
    handleRotate,
    handleResetCamera,
  } = useCameraControls();

  const leftPanel = (
    <ControlPanel
      selectedModelIds={selectedModelIds}
      onModelSelection={handleModelSelection}
      aiFunctions={aiFunctions}
      onAiFunctionChange={handleAiFunctionChange}
      searchTerm={displaySettings.searchTerm}
      setSearchTerm={(value) => updateDisplaySettings('searchTerm', value)}
      showDrone={displaySettings.showDrone}
      setShowDrone={(value) => updateDisplaySettings('showDrone', value)}
      allModels={allModels}
      isAnnotationMode={displaySettings.isAnnotationMode}
      setIsAnnotationMode={(value) =>
        updateDisplaySettings('isAnnotationMode', value)
      }
    />
  );

  const mainContent = (
    <div className="flex-1 flex flex-col">
      <RenderArea
        selectedModels={selectedModels}
        cameraControlsRef1={cameraControlsRef1}
        cameraControlsRef2={cameraControlsRef2}
        delta={cameraSettings.delta}
        rotationDelta={cameraSettings.rotationDelta}
        showDrone={displaySettings.showDrone}
        isAnnotationMode={displaySettings.isAnnotationMode}
      />
      {selectedModelIds.length > 0 && (
        <CameraControlPanel
          delta={cameraSettings.delta}
          setDelta={(value) => updateCameraSettings('delta', value)}
          rotationDelta={cameraSettings.rotationDelta}
          setRotationDelta={(value) =>
            updateCameraSettings('rotationDelta', value)
          }
          handleMove={handleMove}
          handleRotate={handleRotate}
          handleResetCamera={handleResetCamera}
          cameraControlsRef1={cameraControlsRef1}
          cameraControlsRef2={cameraControlsRef2}
        />
      )}
    </div>
  );

  return <ViewerLayout leftPanel={leftPanel} mainContent={mainContent} />;
}

export default Viewer;
