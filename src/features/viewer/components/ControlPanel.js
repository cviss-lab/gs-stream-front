import React from 'react';
import { Box } from '@mui/material';
import ObjectSelection from './controls/ObjectSelection';
import AiFunctions from './controls/AiFunctions';

function ControlPanel({
  selectedObjects,
  onObjectSelection,
  aiFunctions,
  onAiFunctionChange,
  searchTerm,
  setSearchTerm,
  allModels,
}) {
  return (
    <Box className="w-full lg:w-1/5 min-w-[250px] p-4 bg-white shadow-md overflow-auto">
      <h2 className="text-xl font-bold mb-4 text-sky-600 text-center">
        Control Panel
      </h2>

      <ObjectSelection
        selectedObjects={selectedObjects}
        onObjectSelection={onObjectSelection}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allModels={allModels}
      />

      <AiFunctions
        aiFunctions={aiFunctions}
        onAiFunctionChange={onAiFunctionChange}
      />
    </Box>
  );
}

export default ControlPanel;
