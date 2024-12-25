import React from 'react';
import { Box } from '@mui/material';
import ModelSelector from '../model/ModelSelector';
import AiFunctions from '../tools/AiFunctions';
import Tools from '../tools/Tools';

function ControlPanel({
  selectedModelIds,
  onModelSelection,
  aiFunctions,
  onAiFunctionChange,
  tools,
  onToolChange,
  searchTerm,
  setSearchTerm,
  allModels,
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

      <Tools tools={tools} onToolChange={onToolChange} />
    </Box>
  );
}

export default ControlPanel;
