import { useState, useCallback } from 'react';

const TOOL_SETTINGS_MAP = {
  drone: 'showDrone',
  annotation: 'isAnnotationMode',
};

export const useTools = (displaySettings, updateDisplaySettings) => {
  const tools = {
    drone: displaySettings.showDrone,
    annotation: displaySettings.isAnnotationMode,
  };

  const handleToolChange = useCallback(
    (toolName) => {
      const settingName = TOOL_SETTINGS_MAP[toolName];
      if (settingName) {
        updateDisplaySettings(settingName, !displaySettings[settingName]);
      }
    },
    [displaySettings, updateDisplaySettings],
  );

  const resetTools = useCallback(() => {
    Object.values(TOOL_SETTINGS_MAP).forEach((settingName) => {
      updateDisplaySettings(settingName, false);
    });
  }, [updateDisplaySettings]);

  return {
    tools,
    handleToolChange,
    resetTools,
  };
};
