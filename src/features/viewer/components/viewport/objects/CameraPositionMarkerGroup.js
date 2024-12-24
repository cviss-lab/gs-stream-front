import { useRef } from 'react';
import CameraOrb from './CameraPositionMarker';

function CameraPositionMarkerGroup({ data }) {
  const camRefs = useRef([]);

  const handleStateChange = (state) => {
    console.log(`State change detected in box ${state.number}:`, state);
  };

  return (
    <>
      {data.map((item, index) => (
        <CameraOrb
          ref={(el) => (camRefs.current[index] = el)}
          position={item.position}
          rotation={item.rotation}
          number={item.id}
          onStateChange={handleStateChange}
        />
      ))}
    </>
  );
}

export default CameraPositionMarkerGroup;
