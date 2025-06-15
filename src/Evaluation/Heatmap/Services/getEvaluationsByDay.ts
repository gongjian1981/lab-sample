import type { EvaluationRow } from './evaluation';

/**
 * Returns all evaluations due on the specified day.
 * @param data List of evaluation items.
 * @param dateStr Target date string in 'YYYY-MM-DD' format.
 * @returns Matching evaluation items.
 */
export function getEvaluationsByDay(
  data: EvaluationRow[],
  dateStr: string
): EvaluationRow[] {

  return data.filter((item) => {
    const due = item.dueDay?.trim?.().slice(0, 10);
    const match = due === dateStr;

    return match;
  });
}