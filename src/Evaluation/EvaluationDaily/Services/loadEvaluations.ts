import type { EvaluationRow } from '../../Heatmap/Services/evaluation';
import { EvaluationLoadService } from '../../Heatmap/Services/EvaluationLoadService';

/**
 * Loads evaluation data from localStorage.
 * If parsing fails, logs the error and returns an empty array.
 * @returns An array of EvaluationRow loaded from localStorage.
 */
export async function loadEvaluations(): Promise<EvaluationRow[]> {
  const evaluationLoadService = EvaluationLoadService.createDefault();
  const result = await evaluationLoadService.loadEvaluations();
  return result;
}
