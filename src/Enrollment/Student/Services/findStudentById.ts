import { Student } from "./StudentInfo";
import { StudentLoadService } from "./StudentLoadService";

export async function findStudentById(id: string): Promise<Student | undefined> {
  const studentLoadService = StudentLoadService.createDefault();
  const students = await studentLoadService.loadStudents();

  if (!students || !Array.isArray(students)) return undefined;
  return students.find((student) => student.id === id);
}
