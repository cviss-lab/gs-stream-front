import React from 'react';
import InspectionCanvas from './render/InspectionCanvas';

function RenderArea({
  selectedModels,
  cameraControlsRef1,
  cameraControlsRef2,
  delta,
  rotationDelta,
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
            splatUrl={model.splatUrl}
            delta={delta}
            rotationDelta={rotationDelta}
            modelPosition={model.renderSettings.model.position}
            maxPanX={model.renderSettings.model.maxPan.x}
            maxPanY={model.renderSettings.model.maxPan.y}
            maxPanZ={model.renderSettings.model.maxPan.z}
            cameraSettings={(() => {
              console.log('Camera Settings:', model.renderSettings.camera);
              return model.renderSettings.camera;
            })()}
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
