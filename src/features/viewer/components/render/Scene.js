import CameraControls from './camera/CameraControls';
import SplatComponent from './splat/SplatComponent';
import { Environment } from '@react-three/drei';
import EgoDrone from './three/EgoDrone';
import PropTypes from 'prop-types';
function Scene({
  model,
  delta,
  rotationDelta,
  showDrone,
  keysPressed,
  setCameraPose,
  cameraControlsRef,
}) {
  return (
    <>
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
        maxSplats={20000000}
        splatPos={model.renderSettings.model.position}
        splatRot={[Math.PI, 0, 0]}
        splatScale={17.8}
        splatUrl={model.splatUrl}
      />
      <Environment preset="city" />
      {showDrone && <EgoDrone />}
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
  }).isRequired,
  delta: PropTypes.number.isRequired,
  rotationDelta: PropTypes.number.isRequired,
  showDrone: PropTypes.bool,
  keysPressed: PropTypes.object,
  setCameraPose: PropTypes.func.isRequired,
  cameraControlsRef: PropTypes.object,
};

export default Scene;
