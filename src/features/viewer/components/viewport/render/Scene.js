import CameraControls from '../camera/CameraControls';
import SplatComponent from '../splat/SplatComponent';
import { Environment } from '@react-three/drei';
import EgoDrone from '../objects/EgoDrone';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Annotation from 'features/annotation/Annotation';
import AnnotationHandler from 'features/annotation/AnnotationHandler';

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
  const [annotations, setAnnotations] = useState([]);
  const splatRef = useRef(null);

  const handleAddAnnotation = (annotation) => {
    setAnnotations((prev) => [
      ...prev,
      {
        ...annotation,
        label: `Marker ${prev.length + 1}`,
      },
    ]);
  };

  const handleAnnotationClick = (id) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  };

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
        onAddAnnotation={handleAddAnnotation}
        splatRef={splatRef}
        annotations={annotations}
      />

      {annotations.map((annotation) => (
        <Annotation
          key={annotation.id}
          id={annotation.id}
          position={annotation.position}
          label={annotation.label}
          onClick={() => handleAnnotationClick(annotation.id)}
        />
      ))}
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
  isAnnotationMode: PropTypes.bool,
};

export default Scene;
