// React related imports
import React, { useState, useMemo } from 'react';

// Component imports (alphabetical order)
import CameraControlPanel from 'components/View/CSR/UnifiedView/components/CameraControlPanel';
import ControlPanel from 'components/View/CSR/UnifiedView/components/ControlPanel';
import RenderArea from 'components/View/CSR/UnifiedView/components/RenderArea';
import TopNavigation from 'components/View/CSR/UnifiedView/components/TopNavigation';

// Constants
import { DUAL_VIEW_SETTINGS } from 'components/View/CSR/Dual/CsrDualViewSettings';

// Custom hooks
import { useCameraControls } from 'components/View/CSR/UnifiedView/hooks/useCameraControls';
import { useModelData } from 'components/View/CSR/UnifiedView/hooks/useModelData';

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
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [aiFunctions, setAiFunctions] = useState({
    measurement: false,
    annotation: false,
    segmentation: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [delta, setDelta] = useState(DUAL_VIEW_SETTINGS.delta);
  const [rotationDelta, setRotationDelta] = useState(
    DUAL_VIEW_SETTINGS.rotationDelta,
  );

  const backendCsrAddress = process.env.REACT_APP_CSR_BACKEND_URL;
  const { allModels } = useModelData(backendCsrAddress);
  const { cameraControlsRef1, cameraControlsRef2, handleResetCamera } =
    useCameraControls();

  const getWebglModelUrl = (modelId) =>
    `${backendCsrAddress}/api/assets/splat/${modelId}`;

  const handleObjectSelection = (modelId) => {
    setSelectedObjects((prev) =>
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

  const cameraSettings = useMemo(
    () => ({
      position: [17.46, 65.26, 16.1],
      rotation: [-115.29, 48.02, 152.66],
      fov: 75,
      near: 0.05,
      far: 1000,
    }),
    [],
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopNavigation />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <ControlPanel
          selectedObjects={selectedObjects}
          onObjectSelection={handleObjectSelection}
          aiFunctions={aiFunctions}
          onAiFunctionChange={handleAiFunctionChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          allModels={allModels}
        />
        <div className="flex-1 p-4 flex flex-col">
          <RenderArea
            selectedObjects={selectedObjects}
            allModels={allModels}
            cameraControlsRef1={cameraControlsRef1}
            cameraControlsRef2={cameraControlsRef2}
            getWebglModelUrl={getWebglModelUrl}
            delta={delta}
            rotationDelta={rotationDelta}
            cameraSettings={cameraSettings}
          />
          {selectedObjects.length > 0 && (
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
