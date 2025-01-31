import { useEffect } from 'react';
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useThree } from '@react-three/fiber';
import { Vector2, Raycaster, Vector3, Matrix4 } from 'three';
import Annotation from './Annotation';
import { useAnnotations } from './hooks/useAnnotations';

// eslint-disable-next-line react/display-name
const AnnotationHandler = forwardRef(({ isAnnotationMode }, ref) => {
  // splatRef prop 제거
  const { camera, gl, scene } = useThree(); // scene 객체 추가
  const { annotations, addAnnotation, resetAnnotations } = useAnnotations();

  useImperativeHandle(ref, () => ({
    resetAnnotations: () => {
      resetAnnotations();
    },
  }));

  const handleClick = (event) => {
    if (!isAnnotationMode) {
      console.log('Annotation mode off');
      return;
    }

    const rect = gl.domElement.getBoundingClientRect();
    const mousePosition = new Vector2();
    mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new Raycaster();
    raycaster.setFromCamera(mousePosition, camera);

    // **Mesh 타입 오브젝트만 필터링**
    const splatMeshes = scene.children.filter((child) => child.type === 'Mesh');
    console.log('Filtered Meshes:', splatMeshes); // 필터링된 Mesh 목록 확인

    const intersects = raycaster.intersectObjects(splatMeshes, true);

    if (intersects.length > 0) {
      const intersectionPointWorld = intersects[0].point; // 월드 좌표계 충돌 지점
      console.log(
        'Raycasting Intersection Point (World):',
        intersectionPointWorld,
      );

      // **Splat Mesh 의 월드 변환 행렬 역행렬 (MatrixWorld Inverse) 획득**
      const splatMesh = splatMeshes[0]; // 필터링된 Mesh 중 첫 번째 Mesh (Splat Mesh 라고 가정)
      const modelMatrixInverse = new Matrix4();
      modelMatrixInverse.copy(splatMesh.matrixWorld).invert();

      // **월드 좌표를 모델 좌표계로 변환**
      const intersectionPointLocal = intersectionPointWorld
        .clone()
        .applyMatrix4(modelMatrixInverse);
      console.log(
        'Raycasting Intersection Point (Local):',
        intersectionPointLocal,
      );

      addAnnotation([
        intersectionPointLocal.x,
        intersectionPointLocal.y,
        intersectionPointLocal.z,
      ]);
    } else {
      console.log('No intersection found with Splat Mesh.');
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
        // <Annotation
        //   key={annotation.id}
        //   id={annotation.id}
        //   position={annotation.position}
        //   label={`Marker ${annotations.length + 1}`}
        //   onClick={() => {
        //     console.log('Remove marker');
        //   }}
        // />
        <mesh // <Annotation> 대신 <mesh> 로 임시 변경
          key={annotation.id}
          position={annotation.position} // position prop 그대로 사용
        >
          <sphereGeometry args={[0.1, 32, 32]} /> {/* 구 형태의 Mesh */}
          <meshBasicMaterial color="red" /> {/* 빨간색 기본 재질 */}
        </mesh>
      ))}
    </>
  );
});
AnnotationHandler.propTypes = {
  isAnnotationMode: PropTypes.bool.isRequired,
  splatRef: PropTypes.any, // 더 이상 splatRef 필요 없음 (PropTypes any 또는 제거)
};

export default AnnotationHandler;
