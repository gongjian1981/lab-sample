import type { EvaluationRow } from '../Types/EvaluationTypes';

/**
 * Filters evaluation records by date (YYYY-MM-DD).
 */
export function getEvaluationsForDate(data: EvaluationRow[], date: string): EvaluationRow[] {
  console.log(`Filtering evaluations for date: ${date}`);
  console.log(`Total evaluations: ${data.length}`);
  console.log(data);
  return data.filter(ev => ev.due_day?.trim().slice(0, 10) === date);
}
