import React from 'react';
import InspectionCanvas from './InspectionCanvas';

function RenderArea({
  selectedObjects,
  allModels,
  cameraControlsRef1,
  cameraControlsRef2,
  getWebglModelUrl,
  delta,
  rotationDelta,
  cameraSettings,
}) {
  return (
    <div
      className={`flex-1 relative grid gap-4 ${
        selectedObjects.length === 1
          ? 'grid-cols-1'
          : selectedObjects.length === 2
            ? 'grid-cols-2'
            : 'grid-cols-1'
      }`}
    >
      {selectedObjects
        .map((id) => allModels.find((model) => model.id === id))
        .filter((object) => object !== undefined)
        .map((object, index) => (
          <div key={object.id} className="w-full h-full relative">
            <InspectionCanvas
              ref={
                selectedObjects.length === 1
                  ? cameraControlsRef1
                  : selectedObjects.length === 2
                    ? index === 0
                      ? cameraControlsRef1
                      : cameraControlsRef2
                    : null
              }
              splatUrl={getWebglModelUrl(object.id)}
              delta={delta}
              rotationDelta={rotationDelta}
              modelPosition={[0, 0, 0]}
              maxPanX={200}
              maxPanY={200}
              maxPanZ={200}
              cameraSettings={cameraSettings}
            />
          </div>
        ))}
      {selectedObjects.length === 0 && (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Select an object to render
        </div>
      )}
    </div>
  );
}

export default RenderArea;
