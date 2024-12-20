import React from 'react';
import { Html } from '@react-three/drei';

const Annotation = ({ position, onClick, label }) => {
  return (
    <Html position={position} occlude={true} distanceFactor={20}>
      <div className="flex flex-col items-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-8 h-8 bg-red-500 rounded-full cursor-pointer hover:scale-150 transition-transform"
        />
        <span className="mt-2 px-2 py-1 bg-black/50 text-white rounded text-base whitespace-nowrap">
          {label}
        </span>
      </div>
    </Html>
  );
};

export default Annotation;
