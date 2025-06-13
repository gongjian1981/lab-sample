import type { EvaluationItem } from '../Types/evaluation';
import { getEvaluationsByDay } from './get-evaluations-by-day';

export function getEvaluationsByDayMap(
  data: EvaluationItem[],
  startDate: Date,
  endDate: Date
): Record<string, EvaluationItem[]> {
  const result: Record<string, EvaluationItem[]> = {};

  for (const row of data) {
    const rowDate = new Date(row.due_day);
    if (rowDate >= startDate && rowDate <= endDate) {
      const key = rowDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(row);
    }
  }
  return result;
}