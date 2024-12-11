import React, { useState, useEffect, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraControls from './camera/CameraControls';
import SplatComponent from './splat/SplatComponent';
import { Environment } from '@react-three/drei';
import KeyDisplay from './camera/KeyDisplay';
import EgoDrone from './three/EgoDrone';
const InspectionCanvas = forwardRef(
  (
    {
      delta,
      rotationDelta,
      splatUrl,
      modelPosition,
      maxPanX,
      maxPanY,
      maxPanZ,
      cameraSettings,
      showDrone,
    },
    ref,
  ) => {
    const [keysPressed, setKeysPressed] = useState({});
    const [cameraPose, setCameraPose] = useState({
      position: {
        x: cameraSettings.position[0],
        y: cameraSettings.position[1],
        z: cameraSettings.position[2],
      },
      rotation: {
        x: cameraSettings.rotation[0],
        y: cameraSettings.rotation[1],
        z: cameraSettings.rotation[2],
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
          camera={cameraSettings}
        >
          <axesHelper args={[5]} />
          <CameraControls
            ref={ref}
            keysPressed={keysPressed}
            delta={delta}
            rotationDelta={rotationDelta}
            maxPanX={maxPanX}
            maxPanY={maxPanY}
            maxPanZ={maxPanZ}
            setCameraPose={setCameraPose}
            cameraSettings={cameraSettings}
          />
          <SplatComponent
            maxSplats={20000000}
            splatPos={modelPosition}
            splatRot={[Math.PI, 0, 0]}
            splatScale={17.8}
            splatUrl={splatUrl}
          />
          <Environment preset="city" />
          {showDrone && <EgoDrone />}
        </Canvas>
      </div>
    );
  },
);

InspectionCanvas.displayName = 'InspectionCanvas';

export default InspectionCanvas;
