import React, { createContext, useState, useCallback, useEffect } from 'react';

// Modify to export AnnotationsContext
export const AnnotationsContext = createContext();

export function AnnotationsProvider({ children }) {
  const [annotations, setAnnotations] = useState([]);

  const addAnnotation = useCallback((position) => {
    setAnnotations((prev) => [...prev, { id: Date.now(), position }]);
  }, []);

  const resetAnnotations = useCallback(() => {
    setAnnotations([]);
    console.log('Reset called, annotations should be empty now.');
  }, []);

  useEffect(() => {
    console.log('Annotations updated:', annotations);
  }, [annotations]);

  const value = { annotations, addAnnotation, resetAnnotations };
  return (
    <AnnotationsContext.Provider value={value}>
      {children}
    </AnnotationsContext.Provider>
  );
}
