import { StudentLoadService } from "./StudentLoadService";

export async function getSections(
): Promise<string[]> {

  const studentLoadService = StudentLoadService.createDefault();
  const students = await studentLoadService.loadStudents();
    if (!students || !Array.isArray(students)) {
    return [];
  }
  return Array.from(new Set(students.map(d => d.section)));
}