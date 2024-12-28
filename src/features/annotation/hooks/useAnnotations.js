import { useContext } from 'react';
import { AnnotationsContext } from './AnnotationsContext';

export function useAnnotations() {
  return useContext(AnnotationsContext);
}
