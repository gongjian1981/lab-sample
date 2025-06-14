import { EVALUATION_DATA_STORAGE_KEY } from '../../../constants';
import type { EvaluationRow } from './evaluation';

/**
 * Loads evaluation data from localStorage.
 * If parsing fails, logs the error and returns an empty array.
 * @returns An array of EvaluationRow loaded from localStorage.
 */
export function loadEvaluations(): EvaluationRow[] {
  const raw = localStorage.getItem(EVALUATION_DATA_STORAGE_KEY);
  if (!raw) return [];
  
  try {
    return JSON.parse(raw) as EvaluationRow[];
  } catch (err) {
    console.error('[loadEvaluationsFromStorage] Failed to parse:', err);
    return [];
  }
}
