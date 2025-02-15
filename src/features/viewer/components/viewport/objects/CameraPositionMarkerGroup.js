import { useRef } from 'react';
import CameraOrb from './CameraPositionMarker';

function CameraPositionMarkerGroup({ data }) {
  const camRefs = useRef([]);

  const handleStateChange = (state) => {
    console.log(`State change detected in box ${state.number}:`, state);
  };
  return (
    <>
      {data.map((item, index) => {
        // eslint-disable-next-line
        const rotProps = item.quaternion ? { rotation: item.quaternion } : { rotation: item.rotation };

        return (
          <CameraOrb
            ref={(el) => (camRefs.current[index] = el)}
            position={item.position}
            {...rotProps}
            number={item.id}
            onStateChange={handleStateChange}
          />
        );
      })}
    </>
  );
}

export default CameraPositionMarkerGroup;
