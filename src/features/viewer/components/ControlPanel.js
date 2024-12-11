import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';
import ModelSelector from './controls/ModelSelector';
import AiFunctions from './controls/AiFunctions';
import Tools from './controls/Tools';

function ControlPanel({
  selectedModelIds,
  onModelSelection,
  aiFunctions,
  onAiFunctionChange,
  searchTerm,
  setSearchTerm,
  allModels,
  showDrone,
  setShowDrone,
}) {
  return (
    <Box className="w-full lg:w-1/5 min-w-[250px] p-4 bg-white shadow-md overflow-auto">
      <h2 className="text-xl font-bold mb-4 text-sky-600 text-center">
        Control Panel
      </h2>

      <ModelSelector
        selectedModelIds={selectedModelIds}
        onModelSelection={onModelSelection}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allModels={allModels}
      />

      <AiFunctions
        aiFunctions={aiFunctions}
        onAiFunctionChange={onAiFunctionChange}
      />

      <Tools showDrone={showDrone} setShowDrone={setShowDrone} />
    </Box>
  );
}

export default ControlPanel;
