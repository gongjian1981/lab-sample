import { getAllStudents } from "./getAllStudents";

export function getSections(
): string[] {
  const students = getAllStudents();
  if (!students || !Array.isArray(students)) {
    return [];
  }
  return Array.from(new Set(students.map(d => d.section)));
}