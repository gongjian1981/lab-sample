import { Student } from "./StudentInfo";
import { getAllStudents } from "./getAllStudents";

export function findStudentById(id: string): Student | undefined {
  const students = getAllStudents();
  if (!students || !Array.isArray(students)) return undefined;
  return students.find((student) => student.id === id);
}
