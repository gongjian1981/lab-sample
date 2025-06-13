import type { EvaluationItem } from '../Types/evaluation';

/**
 * Returns all evaluations due on the specified day.
 * @param data List of evaluation items.
 * @param dateStr Target date string in 'YYYY-MM-DD' format.
 * @returns Matching evaluation items.
 */
export function getEvaluationsByDay(
  data: EvaluationItem[],
  dateStr: string
): EvaluationItem[] {
  console.log('[getEvaluationsByDay] Filter dateStr:', dateStr);

  return data.filter((item) => {
    const due = item.due_day?.trim?.().slice(0, 10);
    const match = due === dateStr;

    console.log(`[Compare] dueDay: ${due}, match: ${match}`);

    return match;
  });
}