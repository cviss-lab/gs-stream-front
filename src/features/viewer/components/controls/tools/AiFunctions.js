import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@mui/material';

function AiFunctions({ aiFunctions, onAiFunctionChange }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-sky-600">AI Functions</h3>
      <div className="-my-2">
        {Object.entries(aiFunctions).map(([func, isChecked]) => (
          <div key={func} className="flex items-center py">
            <Checkbox
              checked={isChecked}
              onChange={() => onAiFunctionChange(func)}
              aria-label={`Toggle ${func} function`}
              sx={{
                padding: '2px',
                '& .MuiSvgIcon-root': { fontSize: 20 },
              }}
            />
            <label className="ml-2 capitalize">{func}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
AiFunctions.propTypes = {
  aiFunctions: PropTypes.object.isRequired,
  onAiFunctionChange: PropTypes.func.isRequired,
};

export default AiFunctions;
