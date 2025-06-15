import { STUDENT_DATA_STORAGE_KEY } from "../../../constants";
import { loadFromStorage } from "../../../localStroageService/localStroageService";
import { Student } from "./StudentInfo";

export function getAllStudents(
  ): Student[] {
  const students = loadFromStorage<Student[]>(STUDENT_DATA_STORAGE_KEY);
  if (!students || !Array.isArray(students)) return [];
  return students;
}