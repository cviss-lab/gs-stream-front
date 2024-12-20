import { useState } from 'react';

export function useCameraPose(initialCamera) {
  const [cameraPose, setCameraPose] = useState({
    position: {
      x: initialCamera.position[0],
      y: initialCamera.position[1],
      z: initialCamera.position[2],
    },
    rotation: {
      x: initialCamera.rotation[0],
      y: initialCamera.rotation[1],
      z: initialCamera.rotation[2],
    },
  });

  const updateCameraPose = (newPose) => {
    setCameraPose(newPose);
  };

  return [cameraPose, updateCameraPose];
}
