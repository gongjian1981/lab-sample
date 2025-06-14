import type { EvaluationRow } from '../../Heatmap/Services/evaluation';

/**
 * Filters evaluation records by date (YYYY-MM-DD).
 */
export function getEvaluationsForDate(data: EvaluationRow[], date: string): EvaluationRow[] {
  return data.filter(ev => ev.dueDay?.trim().slice(0, 10) === date);
}
