// evaluation-storage.ts

import type { EvaluationItem } from '../Types/evaluation';

/**
 * Loads evaluation data from localStorage.
 * If parsing fails, logs the error and returns an empty array.
 * @returns An array of EvaluationItem loaded from localStorage.
 */
export function loadEvaluationsFromStorage(): EvaluationItem[] {
  const raw = localStorage.getItem('uploaded-eval-data');
  if (!raw) return [];

  try {
    return JSON.parse(raw) as EvaluationItem[];
  } catch (err) {
    console.error('[loadEvaluationsFromStorage] Failed to parse:', err);
    return [];
  }
}
