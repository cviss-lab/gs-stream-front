import React from 'react';
import { Checkbox } from '@mui/material';

function Tools({ tools, onToolChange }) {
  const handleChange = (tool, isChecked) => {
    console.log(`Tool ${tool} is now ${!isChecked ? 'enabled' : 'disabled'}`);
    onToolChange(tool);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-sky-600">Tools</h3>
      <div className="space-y-2">
        {Object.entries(tools).map(([tool, isChecked]) => (
          <div key={tool} className="flex items-center">
            <Checkbox
              checked={isChecked}
              onChange={() => handleChange(tool, isChecked)}
              aria-label={`Toggle ${tool} function`}
            />
            <label className="ml-2 capitalize">{tool}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tools;
