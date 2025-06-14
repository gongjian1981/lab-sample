import type { EvaluationRow } from './evaluation';

/**
 * Filters evaluation items by year and month.
 * @param data The full list of evaluation items.
 * @param year The target year (e.g., 2025).
 * @param month The target month (1–12).
 * @returns A filtered array of evaluation items.
 */
export function filterEvaluationsByMonth(
  data: EvaluationRow[],
  year: number,
  month: number
): EvaluationRow[] {
  return data.filter((item) => {
    const date = new Date(item.dueDay.trim());
    return (
      !isNaN(date.getTime()) &&
      date.getFullYear() === year &&
      date.getMonth() + 1 === month
    );
  });
}