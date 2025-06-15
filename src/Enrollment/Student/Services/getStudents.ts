import { getAllStudents } from "./getAllStudents";
import { Student } from "./StudentInfo";

export function getStudents(
  section?: string,
  page: number = 1,
  pageSize: number = 10
): { data: Student[]; total: number; totalPages: number } {
  const students = getAllStudents();
  if (!students || !Array.isArray(students)) return { data: [], total: 0, totalPages: 0 };

  const filtered = section ? students.filter(s => s.section === section) : students;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filtered.slice(start, end),
    total,
    totalPages
  };
}