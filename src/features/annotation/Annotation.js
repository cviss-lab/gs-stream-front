import React from 'react';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Html } from '@react-three/drei';

const Annotation = ({ position, onClick, label, id }) => {
  const meshRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      const distance = camera.position.distanceTo(meshRef.current.position);
      const scale = distance * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>

      <Html
        position={position}
        distanceFactor={10}
        style={{
          pointerEvents: 'none',
          background: 'rgba(0,0,0,0.5)',
          padding: '4px 8px',
          borderRadius: '4px',
          transform: 'translate3d(-50%, -150%, 0)',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
      >
        {`#${id} ${label || ''}`}
      </Html>
    </>
  );
};

export default Annotation;
