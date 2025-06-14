import { EVALUATION_DATA_STORAGE_KEY } from '../../../constants';
import type { EvaluationRow } from './evaluation';
import { localStorageService } from '../../../localStroageService';

/**
 * Loads evaluation data from localStorage.
 * If parsing fails, logs the error and returns an empty array.
 * @returns An array of EvaluationRow loaded from localStorage.
 */
export function loadEvaluations(): EvaluationRow[] {
  try {
    const data = localStorageService.load<EvaluationRow[]>(EVALUATION_DATA_STORAGE_KEY);
    return data ?? [];
  } catch (error) {
    console.error('Failed to load evaluations:', error);
    return [];
  }
}
