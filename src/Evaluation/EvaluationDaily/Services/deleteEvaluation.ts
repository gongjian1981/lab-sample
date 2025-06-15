import type { EvaluationRow } from '../../Heatmap/Services/evaluation';
import { CsvHandler } from '../../../CsvHandler/csvHandler';
import { saveEvaluations } from './evaluationStorage';

/**
 * Deletes an evaluation entry at the given index.
 */
export function deleteEvaluation(
  data: EvaluationRow[],
  evaluationId: string,
  filePath: string | null
): EvaluationRow[] {
  const updated = data.filter(ev => ev.evaluationId !== evaluationId);
  if (filePath) CsvHandler.saveDataToFile(filePath, updated);
  saveEvaluations(updated);
  return updated;
}
