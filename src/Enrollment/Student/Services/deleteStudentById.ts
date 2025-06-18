import { Student } from './StudentInfo';
import { StudentSaveService } from './StudentSaveService';
import { StudentLoadService } from './StudentLoadService';

export async function deleteStudentById(
  studentId: string
): Promise<void> {
  const studentLoadService = StudentLoadService.createDefault();
  const studentSaveService = StudentSaveService.createDefault();
  const data: Student[] = await studentLoadService.loadStudents();
  if (!data) {
    console.error('No student data found.');
    return;
  }
  const updatedData = data.filter((s) => s.id !== studentId);
  studentSaveService.save(updatedData);
}