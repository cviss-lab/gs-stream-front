import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const DRONE_MODEL_PATH =
  process.env.PUBLIC_URL + '/model/drone_sample_centered.glb';
const DRONE_SCALE = 20;
const TOGGLE_KEY = 'KeyF';

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
    try {
      const clonedScene = scene.clone();
      setModel(clonedScene);
    } catch (error) {
      console.error('Error cloning drone model:', error);
    }
  }, [scene]);

  useEffect(() => {
    if (droneRef.current) {
      droneRef.current.position.copy(camera.position);
      droneRef.current.rotation.copy(camera.rotation);
    }
  }, [camera, model]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === TOGGLE_KEY) {
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
    <mesh ref={droneRef} visible={isVisible} scale={DRONE_SCALE}>
      <primitive object={model} />
    </mesh>
  );
};

useGLTF.preload(DRONE_MODEL_PATH);

export default EgoDrone;
