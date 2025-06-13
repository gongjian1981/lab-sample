import type { EvaluationRow } from '../Types/EvaluationTypes';
import { CsvHandler } from '../../../CsvHandler/csv-handler';
import { saveEvaluationsFromStorage } from './evaluation-storage';

/**
 * Deletes an evaluation entry at the given index.
 */
export function deleteEvaluation(
  data: EvaluationRow[],
  evaluation_id: string,
  filePath: string | null
): EvaluationRow[] {
  console.log('Deleting evaluation with ID:', evaluation_id);
  console.log('Current evaluations:', data);
  const updated = data.filter(ev => ev.evaluation_id !== evaluation_id);
  console.log('Updated evaluations after deletion:', updated);
  if (filePath) CsvHandler.save(filePath, updated);
  saveEvaluationsFromStorage(updated);
  return updated;
}
