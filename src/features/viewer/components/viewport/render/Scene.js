import React from 'react';
import PropTypes from 'prop-types';
import { Environment, Splat } from '@react-three/drei';
import CameraControls from '../camera/CameraControls';
import EgoDrone from '../objects/EgoDrone';
import AnnotationHandler from 'features/annotation/AnnotationHandler';
import CameraArray from '../objects/CameraPositionMarkerGroup';

function Scene({
  model,
  delta,
  rotationDelta,
  keysPressed,
  setCameraPose,
  cameraControlsRef,
  isDroneVisible,
  isPointAnnotationEnabled,
  isCameraAnnotationEnabled,
  // isComponentAnnotationEnabled,
}) {
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <axesHelper args={[5]} />
      <CameraControls
        ref={cameraControlsRef}
        keysPressed={keysPressed}
        delta={delta}
        rotationDelta={rotationDelta}
        setCameraPose={setCameraPose}
        renderSettings={model.renderSettings}
      />
      <Splat
        src={model.splatUrl}
        position={model.renderSettings.model.position}
        scale={1}
      />
      <Environment preset="city" />
      {isDroneVisible && <EgoDrone />}

      <AnnotationHandler isPointAnnotationEnabled={isPointAnnotationEnabled} />
      {isCameraAnnotationEnabled && model.cameraData && (
        <group rotation={[Math.PI, 0, 0]} scale={1}>
          <CameraArray data={model.cameraData} />
        </group>
      )}
      {/* {isComponentAnnotationEnabled && model.componentData()} */}
    </>
  );
}

Scene.propTypes = {
  model: PropTypes.shape({
    splatUrl: PropTypes.string.isRequired,
    renderSettings: PropTypes.shape({
      model: PropTypes.shape({
        position: PropTypes.arrayOf(PropTypes.number).isRequired,
      }).isRequired,
      camera: PropTypes.object.isRequired,
    }).isRequired,
    cameraData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        position: PropTypes.arrayOf(PropTypes.number),
        rotation: PropTypes.arrayOf(PropTypes.number),
      }),
    ),
  }).isRequired,
  delta: PropTypes.number.isRequired,
  rotationDelta: PropTypes.number.isRequired,
  isDroneVisible: PropTypes.bool,
  keysPressed: PropTypes.object,
  setCameraPose: PropTypes.func.isRequired,
  cameraControlsRef: PropTypes.object,
  isPointAnnotationEnabled: PropTypes.bool,
  isCameraAnnotationEnabled: PropTypes.bool,
  isComponentAnnotationEnabled: PropTypes.bool,
};

export default Scene;
