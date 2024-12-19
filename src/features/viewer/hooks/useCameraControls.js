import { useRef, useCallback, useEffect } from 'react';

export const useCameraControls = () => {
  const cameraControlsRef1 = useRef(null);
  const cameraControlsRef2 = useRef(null);

  const handleMove = useCallback(
    (axis, direction, refs = [cameraControlsRef1, cameraControlsRef2]) => {
      refs.forEach((ref) => {
        if (ref.current) ref.current.move(axis, direction);
      });
    },
    [],
  );

  const handleRotate = useCallback(
    (axis, direction, refs = [cameraControlsRef1, cameraControlsRef2]) => {
      refs.forEach((ref) => {
        if (ref.current) ref.current.rotate(axis, direction);
      });
    },
    [],
  );

  const handleResetCamera = useCallback(() => {
    [cameraControlsRef1, cameraControlsRef2].forEach((ref) => {
      if (ref.current) ref.current.resetCamera();
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'r') handleResetCamera();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleResetCamera]);

  return {
    cameraControlsRef1,
    cameraControlsRef2,
    handleMove,
    handleRotate,
    handleResetCamera,
  };
};
