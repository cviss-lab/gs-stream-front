import CameraControls from '../camera/CameraControls';
import SplatComponent from '../splat/SplatComponent';
import { Environment } from '@react-three/drei';
import EgoDrone from '../objects/EgoDrone';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import AnnotationHandler from 'features/annotation/AnnotationHandler';
import CameraArray from '../objects/CameraPositionMarkerGroup';

function Scene({
  model,
  delta,
  rotationDelta,
  showDrone,
  keysPressed,
  setCameraPose,
  cameraControlsRef,
  isAnnotationMode,
}) {
  const splatRef = useRef(null);

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
      <SplatComponent
        splatRef={splatRef}
        maxSplats={20000000}
        splatPos={model.renderSettings.model.position}
        splatRot={[Math.PI, 0, 0]}
        splatScale={17.8}
        splatUrl={model.splatUrl}
      />
      <Environment preset="city" />
      {showDrone && <EgoDrone />}

      <AnnotationHandler
        isAnnotationMode={isAnnotationMode}
        splatRef={splatRef}
      />
      {model.cameraData && (
        <group rotation={[Math.PI, 0, 0]} scale={17.8}>
          <CameraArray data={model.cameraData} />
        </group>
      )}
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
  showDrone: PropTypes.bool,
  keysPressed: PropTypes.object,
  setCameraPose: PropTypes.func.isRequired,
  cameraControlsRef: PropTypes.object,
  isAnnotationMode: PropTypes.bool,
};

export default Scene;
