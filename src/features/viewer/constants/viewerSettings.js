// const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

export const INITIAL_DELTA = 0.1;
export const INITIAL_ROTATION_DELTA = 0.1;

export const DEFAULT_VIEW_SETTINGS = {
  delta: INITIAL_DELTA,
  rotationDelta: INITIAL_ROTATION_DELTA,
  searchTerm: '',
  isDroneVisible: false,
  isPointAnnotationEnabled: false,
  isCameraAnnotationEnabled: false,
  modelPosition: [0, 0, 0],
  maxPanX: 200,
  maxPanY: 200,
  maxPanZ: 200,
  cameraSettings: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    fov: 75,
    near: 0.1,
    far: 1000,
  },
};
