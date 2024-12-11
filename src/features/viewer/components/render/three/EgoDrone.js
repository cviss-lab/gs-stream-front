import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const DRONE_MODEL_PATH =
  process.env.PUBLIC_URL + '/model/drone_sample_centered.glb';

const EgoDrone = () => {
  const [model, setModel] = useState(null);
  const { scene } = useGLTF(DRONE_MODEL_PATH, true);
  const { camera } = useThree();
  const droneRef = useRef();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!scene) {
      console.error('Failed to load drone model');
      return;
    }
    const clonedScene = scene.clone();
    setModel(clonedScene);
  }, [scene]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyF') {
        setIsVisible((prev) => !prev);
        if (droneRef.current) {
          droneRef.current.position.copy(camera.position);
          droneRef.current.rotation.copy(camera.rotation);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera]);

  if (!model) {
    return null;
  }

  return (
    <mesh ref={droneRef} visible={isVisible} scale={2}>
      <primitive object={model} />
    </mesh>
  );
};

// Preload model but don't share instances
useGLTF.preload(DRONE_MODEL_PATH);

export default EgoDrone;
