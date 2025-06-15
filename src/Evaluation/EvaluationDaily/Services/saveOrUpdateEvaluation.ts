import type { EvaluationRow } from '../../Heatmap/Services/evaluation';
import { saveEvaluations } from './evaluationStorage';

/**
 * Saves or updates a single evaluation entry.
 */
export function saveOrUpdateEvaluation(
  data: EvaluationRow[],
  form: Partial<EvaluationRow>,
  date: string,
  filePath: string | null
): EvaluationRow[] {
  const updatedForm: EvaluationRow = {
    evaluationId: form.evaluationId || crypto.randomUUID(),
    courseCode: form.courseCode || '',
    evaluationType: form.evaluationType || '',
    dueDay: date
  };

  const exists = data.some(ev => ev.evaluationId === updatedForm.evaluationId);

  const updatedData = exists
    ? data.map(ev => ev.evaluationId === updatedForm.evaluationId ? updatedForm : ev)
    : [...data, updatedForm];

  saveEvaluations(updatedData);

  return updatedData;
}
