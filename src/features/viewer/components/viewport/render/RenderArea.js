import React from 'react';
import PropTypes from 'prop-types';
import InspectionCanvas from './InspectionCanvas';

function RenderArea({
  selectedModels,
  delta,
  rotationDelta,
  isDroneVisible,
  cameraControlsRef1,
  cameraControlsRef2,
  isPointAnnotationEnabled,
  isCameraAnnotationEnabled,
  isComponentAnnotationEnabled,
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
            delta={delta}
            rotationDelta={rotationDelta}
            isDroneVisible={isDroneVisible}
            isPointAnnotationEnabled={isPointAnnotationEnabled}
            isCameraAnnotationEnabled={isCameraAnnotationEnabled}
            isComponentAnnotationEnabled={isComponentAnnotationEnabled}
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
RenderArea.propTypes = {
  selectedModels: PropTypes.array.isRequired,
  delta: PropTypes.number.isRequired,
  rotationDelta: PropTypes.number.isRequired,
  isDroneVisible: PropTypes.bool.isRequired,
  cameraControlsRef1: PropTypes.object,
  cameraControlsRef2: PropTypes.object,
  isPointAnnotationEnabled: PropTypes.bool.isRequired,
  isCameraAnnotationEnabled: PropTypes.bool.isRequired,
  isComponentAnnotationEnabled: PropTypes.bool.isRequired,
};

export default RenderArea;
