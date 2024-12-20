import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

function Tools({ showDrone, setShowDrone }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-sky-600">Tools</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <Checkbox
            checked={showDrone}
            onChange={(e) => setShowDrone(e.target.checked)}
            aria-label="Toggle drone visibility"
          />
          <label className="ml-2">Show Drone</label>
        </div>
      </div>
    </div>
  );
}

export default Tools;
