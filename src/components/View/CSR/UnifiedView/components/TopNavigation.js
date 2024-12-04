import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import { Home } from 'lucide-react';

function TopNavigation() {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600 leading-normal">
        TowerEye AI
        <span style={{ fontSize: '0.75em', verticalAlign: 'super' }}>
          ™
        </span>{' '}
      </h1>
      <Link to="/">
        <Tooltip title="Back to Home">
          <Button
            variant="outlined"
            startIcon={<Home />}
            aria-label="Back to Home"
          >
            Back to Home
          </Button>
        </Tooltip>
      </Link>
    </div>
  );
}

export default TopNavigation;
