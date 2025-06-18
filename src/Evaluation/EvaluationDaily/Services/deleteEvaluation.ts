import type { EvaluationRow } from '../../Heatmap/Services/evaluation';
import { EvaluationSaveService } from './EvaluationSaveService';

/**
 * Deletes an evaluation entry at the given index.
 */
export function deleteEvaluation(
  data: EvaluationRow[],
  evaluationId: string,
  filePath: string | null
): EvaluationRow[] {
  const updated = data.filter(ev => ev.evaluationId !== evaluationId);
  
  const evaluationSaveService = EvaluationSaveService.createDefault();  
  evaluationSaveService.save(updated);

  return updated;
}
