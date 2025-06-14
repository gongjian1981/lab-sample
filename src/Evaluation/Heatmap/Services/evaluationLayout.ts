// evaluation-layout.ts

/**
 * Determines if a given date belongs to the target month.
 * @param date - The date to check
 * @param targetMonth - The month number (1-12)
 * @returns True if the date is within the target month
 */
export function isCurrentMonth(date: Date, targetMonth: number): boolean {
  return date.getMonth() + 1 === targetMonth;
}

/**
 * Calculates whether a week should be highlighted (e.g. red background)
 * based on number of evaluations in that week.
 * @param count - Total number of evaluations in that week
 * @param threshold - Optional threshold, default is 2
 * @returns True if the week exceeds the threshold
 */
export function shouldHighlightWeek(count: number, threshold: number = 2): boolean {
  return count > threshold;
}
