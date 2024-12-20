import React from 'react';
import { Checkbox } from '@mui/material';

function Tools({ tools }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-sky-600">Tools</h3>
      <div className="space-y-2">
        {tools.map((tool) => (
          <div key={tool.id} className="flex items-center">
            <Checkbox
              checked={tool.value}
              onChange={(e) => tool.onChange(e.target.checked)}
              aria-label={tool.label}
            />
            <label className="ml-2">{tool.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tools;
