// calendar-range.ts

/**
 * Returns an array of Dates covering all weeks that intersect the given month.
 * The range starts from the Monday of the first week and ends at the Sunday of the last week.
 * @param year - Full year (e.g., 2025)
 * @param month - Month number (1-12)
 * @returns An array of Date objects covering full weeks
 */
export function getCalendarRange(year: number, month: number): Date[] {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  const start = new Date(startOfMonth);
  const startWeekday = (start.getDay() + 6) % 7; // Shift so Monday = 0
  start.setDate(start.getDate() - startWeekday);

  const end = new Date(endOfMonth);
  const endWeekday = (end.getDay() + 6) % 7;
  end.setDate(end.getDate() + (6 - endWeekday));

  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDayLabel(
  date: Date,
  selectedMonth: number
): string {
  const month = date.getMonth() + 1; // 0-based
  const day = date.getDate();
  return month === selectedMonth
    ? `${day}`
    : `${month}/${day}`;
}