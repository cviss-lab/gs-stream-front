export const TEST_MODELS = [
  {
    id: '101',
    name: 'st_comb/st_1',
    file: 'st_1.splat',
    viewSettings: {
      camera: {
        position: [-1.55, 0.77, -0.27],
        rotation: [-31.25, -37.32, -25.5],
        fov: 75,
        near: 0.1,
        far: 1000,
      },
      modelPosition: [0, 0, 0],
      maxPanX: 200,
      maxPanY: 200,
      maxPanZ: 200,
    },
  },
  {
    id: '102',
    name: 'st_comb/st_2',
    file: 'st_2.splat',
    viewSettings: {
      camera: {
        position: [-1.57, 0.72, -0.26],
        rotation: [-21.3, -40.51, -19.24],
        fov: 75,
        near: 0.05,
        far: 1000,
      },
      modelPosition: [0, 0, 0],
      maxPanX: 200,
      maxPanY: 200,
      maxPanZ: 200,
    },
  },
  { id: '103', name: 'RCH', file: 'rch.splat' },
  {
    id: '104',
    name: 'tower/0609',
    file: 'point_cloud_0609.splat',
    viewSettings: {
      camera: {
        position: [0, 0, 8.2],
        rotation: [0, 0, 0],
        fov: 75,
        near: 0.1,
        far: 1000,
      },
    },
    hasCameraData: true,
  },
  {
    id: '105',
    name: 'tower/0607',
    file: 'point_cloud_0607.splat',
    viewSettings: {
      camera: {
        position: [0, 0, 8.2],
        rotation: [0, 0, 0],
        fov: 75,
        near: 0.1,
        far: 1000,
      },
    },
    hasCameraData: true,
  },
  {
    id: '106',
    name: 'tower/0527_GPS',
    file: 'point_cloud_0527_GPS.splat',
    viewSettings: {
      camera: {
        position: [-23.74, -7.36, -352.89],
        rotation: [159.37, -52.84, -117.02],
        fov: 75,
        near: 0.1,
        far: 1000,
      },
      modelPosition: [0, 0, 0],
      maxPanX: 2000,
      maxPanY: 2000,
      maxPanZ: 2000,
    },
    hasCameraData: true,
    hasComponentData: true,
  },
];
