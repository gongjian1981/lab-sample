import { Student } from './StudentInfo';
import { getAllStudents } from './getAllStudents';
import { saveStudents } from './saveStudent';

/**
 * Deletes a student by ID.
 */
export function deleteStudentById(
  studentId: string
): void {
  const data: Student[] = getAllStudents();
  if (!data) {
    console.error('No student data found.');
    return;
  }
  const updatedData = data.filter((s) => s.id !== studentId);
  saveStudents(updatedData);
}