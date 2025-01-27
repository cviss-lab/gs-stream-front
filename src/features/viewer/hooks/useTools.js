import { useCallback } from 'react';

const TOOL_SETTINGS_MAP = {
  drone: 'isDroneVisible',
  'point annotations': 'isPointAnnotationEnabled',
  'camera annotations': 'isCameraAnnotationEnabled',
  'component annotations': 'isComponentAnnotationEnabled',
};

export const useTools = (displaySettings, updateDisplaySettings) => {
  const tools = Object.keys(TOOL_SETTINGS_MAP).reduce((acc, tool) => {
    acc[tool] = displaySettings[TOOL_SETTINGS_MAP[tool]];
    return acc;
  }, {});

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

export const generateToolProps = (displaySettings, updateDisplaySettings) => {
  return Object.entries(TOOL_SETTINGS_MAP).reduce((acc, [tool, settingKey]) => {
    acc[settingKey] = displaySettings[settingKey];
    acc[`set${settingKey.charAt(0).toUpperCase() + settingKey.slice(1)}`] = (
      value,
    ) => updateDisplaySettings(settingKey, value);
    return acc;
  }, {});
};
