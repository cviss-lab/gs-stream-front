import { useEffect, useImperativeHandle, forwardRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CameraControls = forwardRef(
  (
    {
      keysPressed,
      delta,
      rotationDelta,
      maxPanX,
      maxPanY,
      maxPanZ,
      setCameraPose,
      cameraSettings,
    },
    ref,
  ) => {
    const { camera } = useThree();

    useEffect(() => {
      // Initialize camera settings
      const [posX, posY, posZ] = cameraSettings.position;
      const [rotX, rotY, rotZ] = cameraSettings.rotation;

      camera.position.set(posX, posY, posZ);
      camera.rotation.set(
        THREE.MathUtils.degToRad(rotX),
        THREE.MathUtils.degToRad(rotY),
        THREE.MathUtils.degToRad(rotZ),
      );
      camera.quaternion.setFromEuler(camera.rotation);
      camera.quaternion.normalize();

      // Set initial pose
      setCameraPose({
        position: { x: posX, y: posY, z: posZ },
        rotation: { x: rotX, y: rotY, z: rotZ },
      });
    }, [camera, cameraSettings]);

    // Expose move, rotate, resetCamera functions to parent component
    useImperativeHandle(ref, () => ({
      move: (axis, direction) => {
        const step = delta;
        if (axis === 'x') {
          camera.position.x += step * direction;
        }
        if (axis === 'y') {
          camera.position.y += step * direction;
        }
        if (axis === 'z') {
          camera.position.z += step * direction;
        }
        // Limit position
        camera.position.x = THREE.MathUtils.clamp(
          camera.position.x,
          -maxPanX,
          maxPanX,
        );
        camera.position.y = THREE.MathUtils.clamp(
          camera.position.y,
          -maxPanY,
          maxPanY,
        );
        camera.position.z = THREE.MathUtils.clamp(
          camera.position.z,
          -maxPanZ,
          maxPanZ,
        );
        // Update pose
        setCameraPose({
          position: camera.position.clone(),
          rotation: {
            x: THREE.MathUtils.radToDeg(camera.rotation.x),
            y: THREE.MathUtils.radToDeg(camera.rotation.y),
            z: THREE.MathUtils.radToDeg(camera.rotation.z),
          },
        });
      },
      rotate: (axis, direction) => {
        const step = rotationDelta * 0.1;
        const rotationAngle = step * direction;
        const quaternion = new THREE.Quaternion();
        if (axis === 'x') {
          quaternion.setFromAxisAngle(
            new THREE.Vector3(1, 0, 0),
            rotationAngle,
          );
        } else if (axis === 'y') {
          quaternion.setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            rotationAngle,
          );
        } else if (axis === 'z') {
          quaternion.setFromAxisAngle(
            new THREE.Vector3(0, 0, 1),
            rotationAngle,
          );
        }
        camera.quaternion.multiplyQuaternions(quaternion, camera.quaternion);
        camera.quaternion.normalize();
        // Update pose
        setCameraPose({
          position: camera.position.clone(),
          rotation: {
            x: THREE.MathUtils.radToDeg(camera.rotation.x),
            y: THREE.MathUtils.radToDeg(camera.rotation.y),
            z: THREE.MathUtils.radToDeg(camera.rotation.z),
          },
        });
      },
      resetCamera: () => {
        camera.position.set(...cameraSettings.position);
        camera.rotation.set(
          THREE.MathUtils.degToRad(cameraSettings.rotation[0]),
          THREE.MathUtils.degToRad(cameraSettings.rotation[1]),
          THREE.MathUtils.degToRad(cameraSettings.rotation[2]),
        );
        camera.quaternion.setFromEuler(camera.rotation);
        camera.quaternion.normalize();
        // Update pose
        setCameraPose({
          position: camera.position.clone(),
          rotation: {
            x: THREE.MathUtils.radToDeg(camera.rotation.x),
            y: THREE.MathUtils.radToDeg(camera.rotation.y),
            z: THREE.MathUtils.radToDeg(camera.rotation.z),
          },
        });
      },
    }));

    useFrame(() => {
      if (!keysPressed) return;

      const prevCameraPosition = camera.position.clone();
      const prevCameraQuaternion = camera.quaternion.clone();

      const effectiveRotationDelta = delta * rotationDelta * 0.1;

      // Handle camera movement based on key input
      if (keysPressed['KeyQ']) camera.translateY(-delta);
      if (keysPressed['KeyE']) camera.translateY(delta);
      if (keysPressed['KeyA']) camera.translateX(-delta);
      if (keysPressed['KeyD']) camera.translateX(delta);
      if (keysPressed['KeyW']) camera.translateZ(-delta);
      if (keysPressed['KeyS']) camera.translateZ(delta);

      // Handle camera rotation based on key input
      const localXAxis = new THREE.Vector3(1, 0, 0)
        .applyQuaternion(camera.quaternion)
        .normalize();
      const localYAxis = new THREE.Vector3(0, 1, 0)
        .applyQuaternion(camera.quaternion)
        .normalize();
      const localZAxis = new THREE.Vector3(0, 0, 1)
        .applyQuaternion(camera.quaternion)
        .normalize();

      // Roll
      if (keysPressed['KeyU']) {
        const rollQuaternion = new THREE.Quaternion().setFromAxisAngle(
          localZAxis,
          effectiveRotationDelta,
        );
        camera.quaternion.multiplyQuaternions(
          rollQuaternion,
          camera.quaternion,
        );
      }
      if (keysPressed['KeyO']) {
        const rollQuaternion = new THREE.Quaternion().setFromAxisAngle(
          localZAxis,
          -effectiveRotationDelta,
        );
        camera.quaternion.multiplyQuaternions(
          rollQuaternion,
          camera.quaternion,
        );
      }

      // Yaw
      if (keysPressed['KeyJ']) {
        const yawQuaternion = new THREE.Quaternion().setFromAxisAngle(
          localYAxis,
          effectiveRotationDelta,
        );
        camera.quaternion.multiplyQuaternions(yawQuaternion, camera.quaternion);
      }
      if (keysPressed['KeyL']) {
        const yawQuaternion = new THREE.Quaternion().setFromAxisAngle(
          localYAxis,
          -effectiveRotationDelta,
        );
        camera.quaternion.multiplyQuaternions(yawQuaternion, camera.quaternion);
      }

      // Pitch
      if (keysPressed['KeyK']) {
        const pitchQuaternion = new THREE.Quaternion().setFromAxisAngle(
          localXAxis,
          -effectiveRotationDelta,
        );
        camera.quaternion.multiplyQuaternions(
          pitchQuaternion,
          camera.quaternion,
        );
      }
      if (keysPressed['KeyI']) {
        const pitchQuaternion = new THREE.Quaternion().setFromAxisAngle(
          localXAxis,
          effectiveRotationDelta,
        );
        camera.quaternion.multiplyQuaternions(
          pitchQuaternion,
          camera.quaternion,
        );
      }

      camera.quaternion.normalize();

      // Limit camera position
      camera.position.x = THREE.MathUtils.clamp(
        camera.position.x,
        -maxPanX,
        maxPanX,
      );
      camera.position.y = THREE.MathUtils.clamp(
        camera.position.y,
        -maxPanY,
        maxPanY,
      );
      camera.position.z = THREE.MathUtils.clamp(
        camera.position.z,
        -maxPanZ,
        maxPanZ,
      );

      // Restore previous state if position is clamped
      const isClamped =
        camera.position.x === -maxPanX ||
        camera.position.x === maxPanX ||
        camera.position.y === -maxPanY ||
        camera.position.y === maxPanY ||
        camera.position.z === -maxPanZ ||
        camera.position.z === maxPanZ;

      if (isClamped) {
        camera.position.copy(prevCameraPosition);
        camera.quaternion.copy(prevCameraQuaternion);
      }

      // Update pose data
      const poseData = {
        position: camera.position.clone(),
        rotation: {
          x: THREE.MathUtils.radToDeg(camera.rotation.x),
          y: THREE.MathUtils.radToDeg(camera.rotation.y),
          z: THREE.MathUtils.radToDeg(camera.rotation.z),
        },
      };
      if (setCameraPose) {
        setCameraPose(poseData);
      }
    });

    return null;
  },
);

export default CameraControls;
