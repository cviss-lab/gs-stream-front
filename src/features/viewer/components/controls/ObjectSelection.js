import React from 'react';
import { TextField, Button, Checkbox, Box, Tooltip } from '@mui/material';
import { Search } from 'lucide-react';

function ObjectSelection({
  selectedObjects,
  onObjectSelection,
  searchTerm,
  setSearchTerm,
  allModels,
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-sky-600">
        Select Objects (Max 2)
      </h3>
      <div className="flex items-center mb-2 text-sky-600">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search objects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2 w-full"
          aria-label="Search objects"
        />
        <Tooltip title="Search (Enter)">
          <Button
            size="small"
            variant="outlined"
            aria-label="Search objects"
            style={{ minWidth: '40px', minHeight: '40px', padding: '8px' }}
          >
            <Search style={{ fontSize: '1.5rem' }} />
          </Button>
        </Tooltip>
      </div>
      <Box className="h-40 border rounded-md p-2 overflow-auto">
        {allModels.length === 0 ? (
          <div className="text-center text-gray-500">None</div>
        ) : (
          allModels
            .filter((model) =>
              model.name?.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((model) => (
              <div key={model.id} className="flex items-center py-1">
                <Checkbox
                  checked={selectedObjects.includes(model.id)}
                  onChange={() => onObjectSelection(model.id)}
                  aria-label={`Select ${model.name}`}
                />
                <label className="ml-2">{model.name}</label>
              </div>
            ))
        )}
      </Box>
    </div>
  );
}

export default ObjectSelection;
