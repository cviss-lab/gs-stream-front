import React, { useState, useEffect, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraControls from './camera/CameraControls';
import SplatComponent from './splat/SplatComponent';
import { Environment } from '@react-three/drei';
import KeyDisplay from './camera/KeyDisplay';
import EgoDrone from './three/EgoDrone';
import PropTypes from 'prop-types';

const InspectionCanvas = forwardRef(({ model, controls, showDrone }, ref) => {
  const [keysPressed, setKeysPressed] = useState({});
  const [cameraPose, setCameraPose] = useState({
    position: {
      x: model.renderSettings.camera.position[0],
      y: model.renderSettings.camera.position[1],
      z: model.renderSettings.camera.position[2],
    },
    rotation: {
      x: model.renderSettings.camera.rotation[0],
      y: model.renderSettings.camera.rotation[1],
      z: model.renderSettings.camera.rotation[2],
    },
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [event.code]: true }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [event.code]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  return (
    <div className="w-full h-full relative">
      <KeyDisplay keysPressed={keysPressed} />

      {/* Camera Pose Display */}
      <div className="absolute top-0 right-0 p-2 bg-white bg-opacity-75 rounded z-10">
        <h3 className="text-sm font-semibold">Camera Pose</h3>
        <p className="text-xs">
          Position: x: {cameraPose.position.x.toFixed(2)}, y:{' '}
          {cameraPose.position.y.toFixed(2)}, z:{' '}
          {cameraPose.position.z.toFixed(2)}
        </p>
        <p className="text-xs">
          Rotation: x: {cameraPose.rotation.x.toFixed(2)}°, y:{' '}
          {cameraPose.rotation.y.toFixed(2)}°, z:{' '}
          {cameraPose.rotation.z.toFixed(2)}°
        </p>
      </div>

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
