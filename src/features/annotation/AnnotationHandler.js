import { useEffect } from 'react';
import React, { forwardRef, useImperativeHandle } from 'react';

import { useThree } from '@react-three/fiber';
import { Vector2, Raycaster, Vector3 } from 'three';
import Annotation from './Annotation';
import { useAnnotations } from './hooks/useAnnotations';

const AnnotationHandler = forwardRef(({ isAnnotationMode, splatRef }, ref) => {
  const { camera, gl } = useThree();
  const { annotations, addAnnotation, resetAnnotations } = useAnnotations();

  // Set up the resetAnnotations method to be called from outside
  useImperativeHandle(ref, () => ({
    resetAnnotations: () => {
      resetAnnotations(); // Reset annotations.
    },
  }));

  const handleClick = (event) => {
    if (!isAnnotationMode) {
      console.log('Annotation mode off');
      return;
    }

    const splatMesh = splatRef;
    if (!splatMesh) {
      console.log('No splat mesh found:', splatRef);
      return;
    }

    console.log('Splat geometry:', splatMesh.geometry.attributes);

    const rect = gl.domElement.getBoundingClientRect();
    const mousePosition = new Vector2();
    mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new Raycaster();
    raycaster.setFromCamera(mousePosition, camera);

    // Get splat mesh attributes
    const splatCenters = splatMesh.geometry.attributes.center.array;
    const splatScales = splatMesh.geometry.attributes.scale.array;
    const splatColors = splatMesh.geometry.attributes.color.array;
    const splatsCount = splatCenters.length / 3;

    // Get world transformation matrix
    const modelMatrix = splatMesh.matrixWorld;
    let closestIntersection = null;
    let minDistance = Infinity;

    // Check each splat
    for (let i = 0; i < splatsCount; i++) {
      const position = new Vector3(
        splatCenters[i * 3],
        splatCenters[i * 3 + 1],
        splatCenters[i * 3 + 2],
      );

      // Convert local coordinates to world coordinates
      position.applyMatrix4(modelMatrix);

      const scale = splatScales[i * 3];
      const opacity = splatColors[i * 4 + 3];

      // Calculate distance between splat and ray
      const distance = raycaster.ray.distanceToPoint(position);
      const cameraDistance = camera.position.distanceTo(position);

      // Find the closest intersection
      if (
        cameraDistance + distance < minDistance &&
        distance < scale * 10 && // Threshold considering scale
        opacity > 0.02 // Ignore transparent splats
      ) {
        minDistance = cameraDistance + distance;
        closestIntersection = position.clone();
      }
    }

    if (closestIntersection) {
      console.log('Found intersection point:', closestIntersection);
      addAnnotation([
        closestIntersection.x,
        closestIntersection.y,
        closestIntersection.z,
      ]);
    }
  };

  useEffect(() => {
    const domElement = gl.domElement;
    domElement.addEventListener('click', handleClick);
    return () => {
      domElement.removeEventListener('click', handleClick);
    };
  }, [gl, isAnnotationMode, annotations]);

  return (
    <>
      {annotations.map((annotation) => (
        <Annotation
          key={annotation.id}
          id={annotation.id}
          position={annotation.position}
          label={`Marker ${annotations.length + 1}`} // Set label
          onClick={() => {
            console.log('Remove marker');
          }}
        />
      ))}
    </>
  );
});

export default AnnotationHandler;
