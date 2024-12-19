import { useState, useCallback } from 'react';
import { DEFAULT_VIEW_SETTINGS } from '../constants/viewerSettings';

export function useViewSettings() {
  const [displaySettings, setDisplaySettings] = useState({
    searchTerm: DEFAULT_VIEW_SETTINGS.searchTerm,
    showDrone: DEFAULT_VIEW_SETTINGS.showDrone,
  });

  const [cameraSettings, setCameraSettings] = useState({
    delta: DEFAULT_VIEW_SETTINGS.delta,
    rotationDelta: DEFAULT_VIEW_SETTINGS.rotationDelta,
  });

  const updateDisplaySettings = useCallback((key, value) => {
    setDisplaySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateCameraSettings = useCallback((key, value) => {
    setCameraSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return {
    displaySettings,
    cameraSettings,
    updateDisplaySettings,
    updateCameraSettings,
  };
}
