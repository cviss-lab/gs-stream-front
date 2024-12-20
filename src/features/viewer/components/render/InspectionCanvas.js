import React, { useState, useEffect, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraControls from './camera/CameraControls';
import SplatComponent from './splat/SplatComponent';
import { Environment } from '@react-three/drei';
import KeyDisplay from './camera/KeyDisplay';
import EgoDrone from './three/EgoDrone';
import PropTypes from 'prop-types';
import { useKeyboardControls } from 'features/viewer/hooks/useKeyboardControls';
import { useCameraPose } from 'features/viewer/hooks/useCameraPose';
import { CameraPoseDisplay } from './camera/CameraPoseDisplay';

const InspectionCanvas = forwardRef(({ model, controls, showDrone }, ref) => {
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
        <axesHelper args={[5]} />
        <CameraControls
          ref={ref}
          keysPressed={keysPressed}
          delta={controls.delta}
          rotationDelta={controls.rotationDelta}
          maxPanX={model.renderSettings.model.maxPan.x}
          maxPanY={model.renderSettings.model.maxPan.y}
          maxPanZ={model.renderSettings.model.maxPan.z}
          setCameraPose={setCameraPose}
          cameraSettings={model.renderSettings.camera}
        />
        <SplatComponent
          maxSplats={20000000}
          splatPos={model.renderSettings.model.position}
          splatRot={[Math.PI, 0, 0]}
          splatScale={17.8}
          splatUrl={model.splatUrl}
        />
        <Environment preset="city" />
        {showDrone && <EgoDrone />}
      </Canvas>
    </div>
  );
});

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
  controls: PropTypes.shape({
    delta: PropTypes.number.isRequired,
    rotationDelta: PropTypes.number.isRequired,
  }).isRequired,
  showDrone: PropTypes.bool,
};

InspectionCanvas.displayName = 'InspectionCanvas';

export default InspectionCanvas;
