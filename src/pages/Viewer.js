// React related imports
import React, { useCallback } from 'react';

// Component imports
import CameraControlPanel from 'features/viewer/components/controls/panels/CameraControlPanel';
import ControlPanel from 'features/viewer/components/controls/panels/ControlPanel';
import RenderArea from 'features/viewer/components/viewport/render/RenderArea';

// Custom hooks
import { useCameraControls } from 'features/viewer/hooks/useCameraControls';
import { useModelData } from 'features/viewer/hooks/useModelData';
import { useModelSelection } from 'features/viewer/hooks/useModelSelection';
import { useAIFunctions } from 'features/viewer/hooks/useAIFunctions';
import { useTools } from 'features/viewer/hooks/useTools';
import { useModelRendering } from 'features/viewer/hooks/useModelRendering';
import { useViewSettings } from 'features/viewer/hooks/useViewSettings';
import { useAnnotations } from 'features/annotation/hooks/useAnnotations';

// Layout imports
import { ViewerLayout } from 'features/viewer/components/layouts/ViewerLayout';

function Viewer() {
  // Check if running in standalone mode
  const isStandalone = process.env.REACT_APP_STANDALONE === 'true';
  const backendAddress = isStandalone ? '' : process.env.REACT_APP_BACKEND_URL;

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

  const { selectedModelIds, handleModelSelection } = useModelSelection();
  const { aiFunctions, handleAiFunctionChange } = useAIFunctions();

  const { tools, handleToolChange, resetTools } = useTools(
    displaySettings,
    updateDisplaySettings,
  );

  const { resetAnnotations } = useAnnotations();

  const { allModels, getWebglModelUrl } = useModelData(
    backendAddress,
    isStandalone,
  );

  const { selectedModels } = useModelRendering(
    selectedModelIds,
    allModels,
    getWebglModelUrl,
  );

  const handleResetAll = useCallback(() => {
    handleResetCamera();
    resetTools();
    resetAnnotations();
  }, [handleResetCamera, resetTools, resetAnnotations]);

  const leftPanel = (
    <ControlPanel
      searchTerm={displaySettings.searchTerm}
      setSearchTerm={(value) => updateDisplaySettings('searchTerm', value)}
      selectedModelIds={selectedModelIds}
      onModelSelection={handleModelSelection}
      allModels={allModels}
      aiFunctions={aiFunctions}
      onAiFunctionChange={handleAiFunctionChange}
      tools={tools}
      onToolChange={handleToolChange}
      showDrone={displaySettings.showDrone}
      setShowDrone={(value) => updateDisplaySettings('showDrone', value)}
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
          handleResetAll={handleResetAll}
          cameraControlsRef1={cameraControlsRef1}
          cameraControlsRef2={cameraControlsRef2}
        />
      )}
    </div>
  );

  return <ViewerLayout leftPanel={leftPanel} mainContent={mainContent} />;
}

export default Viewer;
