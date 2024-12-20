import { useEffect } from 'react';

export function CameraPoseDisplay({ cameraPose }) {
  useEffect(() => {
    console.log('cameraPose', cameraPose);
  }, [cameraPose]);

  return (
    <div className="absolute top-0 right-0 p-2 bg-white bg-opacity-75 rounded z-10">
      <h3 className="text-sm font-semibold">Camera Pose</h3>
      <p className="text-xs">
        Position: x: {cameraPose.position.x.toFixed(2)}, y:{' '}
        {cameraPose.position.y.toFixed(2)}, z:{' '}
        {cameraPose.position.z.toFixed(2)}
      </p>
      <p className="text-xs">
        Rotation: x: {cameraPose.rotation.x.toFixed(2)}°, y:{' '}
        {cameraPose.rotation.y.toFixed(2)}°, z:{' '}
        {cameraPose.rotation.z.toFixed(2)}°
      </p>
    </div>
  );
}
