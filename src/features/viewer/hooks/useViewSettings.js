import { useState, useCallback } from 'react';
import { DEFAULT_VIEW_SETTINGS } from '../constants/viewerSettings';

export function useViewSettings() {
  const [displaySettings, setDisplaySettings] = useState({
    searchTerm: DEFAULT_VIEW_SETTINGS.searchTerm,
    isDroneVisible: DEFAULT_VIEW_SETTINGS.isDroneVisible,
    isPointAnnotationEnabled: DEFAULT_VIEW_SETTINGS.isPointAnnotationEnabled,
    isCameraVisible: DEFAULT_VIEW_SETTINGS.isCameraVisible,
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
