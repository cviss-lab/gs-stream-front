import React from 'react';
import InspectionCanvas from './InspectionCanvas';

function RenderArea({
  selectedModels,
  cameraControlsRef1,
  cameraControlsRef2,
  delta,
  rotationDelta,
  showDrone,
}) {
  return (
    <div
      className={`flex-1 relative grid gap-4 ${
        selectedModels.length === 1
          ? 'grid-cols-1'
          : selectedModels.length === 2
            ? 'grid-cols-2'
            : 'grid-cols-1'
      }`}
    >
      {selectedModels.map((model, index) => (
        <div key={model.id} className="w-full h-full relative">
          <InspectionCanvas
            ref={
              selectedModels.length === 1
                ? cameraControlsRef1
                : selectedModels.length === 2
                  ? index === 0
                    ? cameraControlsRef1
                    : cameraControlsRef2
                  : null
            }
            model={model}
            controls={{
              delta,
              rotationDelta,
            }}
            showDrone={showDrone}
          />
        </div>
      ))}
      {selectedModels.length === 0 && (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Select an object to render
        </div>
      )}
    </div>
  );
}

export default RenderArea;
