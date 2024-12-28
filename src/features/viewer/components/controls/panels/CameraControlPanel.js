import React from 'react';
import { Box, Button, Slider, Tooltip } from '@mui/material';

const CameraControlPanel = ({
  delta,
  setDelta,
  rotationDelta,
  setRotationDelta,
  handleMove,
  handleRotate,
  handleResetCamera,
  handleResetAll,
  cameraControlsRef1,
  cameraControlsRef2,
}) => {
  return (
    <Box className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4 text-sky-600">
        Camera Controls
      </h3>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Move Controls */}
        <div className="flex flex-col">
          <label
            htmlFor="delta"
            className="block text-sm font-medium text-slate-800"
          >
            Move Step
          </label>
          <Slider
            id="delta"
            min={0.1}
            max={10}
            step={0.1}
            value={delta}
            onChange={(e, value) => setDelta(value)}
            className="mb-2"
            style={{ color: 'rgb(2 132 199)' }}
          />
          <p className="text-xs mt-1 text-slate-600">
            Current Move Step: {delta.toFixed(1)}
          </p>
          <MovementButtons
            handleMove={handleMove}
            cameraRefs={[cameraControlsRef1, cameraControlsRef2]}
          />
        </div>

        {/* Rotate Controls */}
        <div className="flex flex-col">
          <label
            htmlFor="rotationDelta"
            className="block text-sm font-medium text-slate-800"
          >
            Rotate Step
          </label>
          <Slider
            id="rotationDelta"
            min={0.1}
            max={1}
            step={0.1}
            value={rotationDelta}
            onChange={(e, value) => setRotationDelta(value)}
            className="mb-2"
            style={{ color: 'rgb(2 132 199)' }}
          />
          <p className="text-xs mt-1 text-slate-600">
            Current Rotate Step: {rotationDelta.toFixed(1)}
          </p>
          <RotationButtons
            handleRotate={handleRotate}
            cameraRefs={[cameraControlsRef1, cameraControlsRef2]}
          />
        </div>

        {/* Reset Buttons */}
        <div className="flex flex-col justify-start">
          <div className="flex space-x-2">
            <Tooltip title="Reset Camera (R)">
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'rgb(2 132 199)',
                  color: 'white',
                  minWidth: '100px',
                }}
                size="small"
                onClick={handleResetCamera}
                aria-label="Reset camera to initial position and rotation (R)"
              >
                Reset Camera
              </Button>
            </Tooltip>
            <Tooltip title="Reset All">
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'rgb(2 132 199)',
                  color: 'white',
                  minWidth: '100px',
                }}
                size="small"
                onClick={handleResetAll}
                aria-label="Reset all settings to initial values"
              >
                Reset All
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </Box>
  );
};

const MovementButtons = ({ handleMove, cameraRefs }) => {
  const buttonStyle = {
    color: 'rgb(2 132 199)',
    borderColor: 'rgb(2 132 199)',
    minWidth: '100px',
  };

  const moveButtons = [
    { key: 'A', axis: 'x', direction: -1, label: 'A (-X)' },
    { key: 'Q', axis: 'y', direction: -1, label: 'Q (-Y)' },
    { key: 'W', axis: 'z', direction: -1, label: 'W (-Z)' },
    { key: 'D', axis: 'x', direction: 1, label: 'D (+X)' },
    { key: 'E', axis: 'y', direction: 1, label: 'E (+Y)' },
    { key: 'S', axis: 'z', direction: 1, label: 'S (+Z)' },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-1 mt-2">
        {moveButtons.slice(0, 3).map((btn) => (
          <Tooltip
            key={btn.key}
            title={`Move camera along ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
          >
            <Button
              size="small"
              variant="outlined"
              style={buttonStyle}
              onClick={() => handleMove(btn.axis, btn.direction, cameraRefs)}
              aria-label={`Move camera along ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
            >
              {btn.label}
            </Button>
          </Tooltip>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1 mt-1">
        {moveButtons.slice(3).map((btn) => (
          <Tooltip
            key={btn.key}
            title={`Move camera along ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
          >
            <Button
              size="small"
              variant="outlined"
              style={buttonStyle}
              onClick={() => handleMove(btn.axis, btn.direction, cameraRefs)}
              aria-label={`Move camera along ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
            >
              {btn.label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </>
  );
};

const RotationButtons = ({ handleRotate, cameraRefs }) => {
  const buttonStyle = {
    color: 'rgb(2 132 199)',
    borderColor: 'rgb(2 132 199)',
    minWidth: '100px',
  };

  const rotateButtons = [
    { key: 'K', axis: 'x', direction: -1, label: 'K (-Rot X)' },
    { key: 'J', axis: 'y', direction: -1, label: 'J (-Rot Y)' },
    { key: 'U', axis: 'z', direction: -1, label: 'U (-Rot Z)' },
    { key: 'I', axis: 'x', direction: 1, label: 'I (+Rot X)' },
    { key: 'L', axis: 'y', direction: 1, label: 'L (+Rot Y)' },
    { key: 'O', axis: 'z', direction: 1, label: 'O (+Rot Z)' },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-1 mt-2">
        {rotateButtons.slice(0, 3).map((btn) => (
          <Tooltip
            key={btn.key}
            title={`Rotate camera around ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
          >
            <Button
              size="small"
              variant="outlined"
              style={buttonStyle}
              onClick={() => handleRotate(btn.axis, btn.direction, cameraRefs)}
              aria-label={`Rotate camera around ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
            >
              {btn.label}
            </Button>
          </Tooltip>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1 mt-1">
        {rotateButtons.slice(3).map((btn) => (
          <Tooltip
            key={btn.key}
            title={`Rotate camera around ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
          >
            <Button
              size="small"
              variant="outlined"
              style={buttonStyle}
              onClick={() => handleRotate(btn.axis, btn.direction, cameraRefs)}
              aria-label={`Rotate camera around ${btn.direction < 0 ? '-' : '+'}${btn.axis.toUpperCase()} axis (${btn.key})`}
            >
              {btn.label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default CameraControlPanel;
