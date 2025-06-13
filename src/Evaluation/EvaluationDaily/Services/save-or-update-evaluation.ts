import type { EvaluationRow } from '../Types/EvaluationTypes';
import { CsvHandler } from '../../../CsvHandler/csv-handler';
import { saveEvaluationsFromStorage } from './evaluation-storage';

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
    evaluation_id: form.evaluation_id || crypto.randomUUID(),
    course_code: form.course_code || '',
    evaluation_type: form.evaluation_type || '',
    due_day: date
  };

  const exists = data.some(ev => ev.evaluation_id === updatedForm.evaluation_id);

  const updatedData = exists
    ? data.map(ev => ev.evaluation_id === updatedForm.evaluation_id ? updatedForm : ev)
    : [...data, updatedForm];

  if (filePath) {
    CsvHandler.save(filePath, updatedData);
  }

  saveEvaluationsFromStorage(updatedData);

  return updatedData;
}
