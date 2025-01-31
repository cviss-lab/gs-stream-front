import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DirectionalBox from './box/DirectionalBox';

export default function MeshArray({ data }) {
  const annotRefs = useRef([]);
  // console.log(data);

  const handleStateChange = (state) => {
    console.log(`State change detected in box ${state.name}:`, state);
  };

  useEffect(() => {
    console.log('Name of all DirectionalBoxes:');
    annotRefs.current.forEach((ref, index) => {
      if (ref) {
        console.log(`Box ${index + 1}:`, ref.name);
      }
    });
  }, []);

  if (!Array.isArray(data)) {
    console.error('MeshArray: data prop must be an array');
    return null;
  }

  return (
    <>
      {data.map((item, index) => (
        <DirectionalBox
          key={item.id || index}
          ref={(el) => (annotRefs.current[index] = el)}
          position={item.position}
          rotation={item.rotation}
          size={item.size}
          name={item.id}
          description={item.description || ''}
          onStateChange={handleStateChange}
        />
      ))}
    </>
  );
}

MeshArray.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      position: PropTypes.arrayOf(PropTypes.number).isRequired,
      rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
      size: PropTypes.arrayOf(PropTypes.number).isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
};
