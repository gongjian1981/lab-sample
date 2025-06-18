import { Student } from "./StudentInfo";
import { StudentLoadService } from "./StudentLoadService";

export async function getStudentsBySectionAndPage(
  section?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ data: Student[]; total: number; totalPages: number; }> {
  const studentLoadService = StudentLoadService.createDefault();
  const students = await studentLoadService.loadStudents();

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