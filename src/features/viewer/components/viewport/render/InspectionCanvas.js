import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import KeyDisplay from '../../controls/display/KeyDisplay';
import { CameraPoseDisplay } from '../../controls/display/CameraPoseDisplay';
import Scene from './Scene';
import { useKeyboardControls } from 'features/viewer/hooks/useKeyboardControls';
import { useCameraPose } from 'features/viewer/hooks/useCameraPose';

const InspectionCanvas = forwardRef(
  ({ model, delta, rotationDelta, isDroneVisible, isAnnotationMode }, ref) => {
    const keysPressed = useKeyboardControls();
    const [cameraPose, setCameraPose] = useCameraPose(
      model.renderSettings.camera,
    );

    return (
      <div className="w-full h-full relative">
        <KeyDisplay keysPressed={keysPressed} />
        <CameraPoseDisplay cameraPose={cameraPose} />

        <Canvas
          className="w-full h-full bg-background"
          gl={{ antialias: false }}
          dpr={window.devicePixelRatio || 1}
          camera={model.renderSettings.camera}
        >
          <Scene
            model={model}
            delta={delta}
            rotationDelta={rotationDelta}
            keysPressed={keysPressed}
            setCameraPose={setCameraPose}
            cameraControlsRef={ref}
            isDroneVisible={isDroneVisible}
            isAnnotationMode={isAnnotationMode}
          />
        </Canvas>
      </div>
    );
  },
);

InspectionCanvas.propTypes = {
  model: PropTypes.shape({
    splatUrl: PropTypes.string.isRequired,
    renderSettings: PropTypes.shape({
      model: PropTypes.shape({
        position: PropTypes.arrayOf(PropTypes.number).isRequired,
        maxPan: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
          z: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
      camera: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  delta: PropTypes.number.isRequired,
  rotationDelta: PropTypes.number.isRequired,
  isDroneVisible: PropTypes.bool,
  isAnnotationMode: PropTypes.bool,
};

InspectionCanvas.defaultProps = {
  isDroneVisible: false,
};

InspectionCanvas.displayName = 'InspectionCanvas';

export default InspectionCanvas;
