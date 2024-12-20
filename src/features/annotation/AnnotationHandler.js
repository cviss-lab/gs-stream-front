import { useThree } from '@react-three/fiber';
import { Vector2, Raycaster, Vector3 } from 'three';
import { useEffect } from 'react';

const AnnotationHandler = ({
  isAnnotationMode,
  onAddAnnotation,
  splatRef,
  annotations,
}) => {
  const { camera, gl } = useThree();

  const handleClick = (event) => {
    if (!isAnnotationMode) {
      console.log('Annotation mode off');
      return;
    }

    const splatMesh = splatRef.current;
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

    // splat 메시의 속성들 가져오기
    const splatCenters = splatMesh.geometry.attributes.center.array;
    const splatScales = splatMesh.geometry.attributes.scale.array;
    const splatColors = splatMesh.geometry.attributes.color.array;
    const splatsCount = splatCenters.length / 3;

    // 월드 변환 행렬 가져오기
    const modelMatrix = splatMesh.matrixWorld;
    let closestIntersection = null;
    let minDistance = Infinity;

    // 각 splat에 대해 검사
    for (let i = 0; i < splatsCount; i++) {
      const position = new Vector3(
        splatCenters[i * 3],
        splatCenters[i * 3 + 1],
        splatCenters[i * 3 + 2],
      );

      // 로컬 좌표를 월드 좌표로 변환
      position.applyMatrix4(modelMatrix);

      const scale = splatScales[i * 3];
      const opacity = splatColors[i * 4 + 3];

      // splat과 레이 사이의 거리 계산
      const distance = raycaster.ray.distanceToPoint(position);
      const cameraDistance = camera.position.distanceTo(position);

      // 가장 가까운 교차점 찾기
      if (
        cameraDistance + distance < minDistance &&
        distance < scale * 10 && // scale을 고려한 임계값
        opacity > 0.02 // 투명한 splat 무시
      ) {
        minDistance = cameraDistance + distance;
        closestIntersection = position.clone();
      }
    }

    if (closestIntersection) {
      console.log('Found intersection point:', closestIntersection);
      onAddAnnotation({
        id: Date.now(),
        position: [
          closestIntersection.x,
          closestIntersection.y,
          closestIntersection.z,
        ],
      });
    }
  };

  useEffect(() => {
    const domElement = gl.domElement;
    domElement.addEventListener('click', handleClick);
    return () => {
      domElement.removeEventListener('click', handleClick);
    };
  }, [gl, isAnnotationMode, handleClick]);

  return null;
};

export default AnnotationHandler;
