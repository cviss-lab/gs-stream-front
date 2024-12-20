import React from 'react';
import { Box, FormControlLabel, Checkbox, Switch } from '@mui/material';
import ModelSelector from '../model/ModelSelector';
import AiFunctions from '../tools/AiFunctions';
import Tools from '../tools/Tools';

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
  isAnnotationMode,
  setIsAnnotationMode,
}) {
  const tools = [
    {
      id: 'drone',
      label: 'Show Drone',
      value: showDrone,
      onChange: setShowDrone,
    },
    {
      id: 'annotation',
      label: 'Annotation Mode',
      value: isAnnotationMode,
      onChange: setIsAnnotationMode,
    },
  ];

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

      <Tools tools={tools} />
    </Box>
  );
}

export default ControlPanel;
