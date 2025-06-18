import { Student } from './StudentInfo';
import { StudentSaveService } from './StudentSaveService';
import { StudentLoadService } from './StudentLoadService';

/**
 * Saves or updates a single student entry.
 */
export async function updateStudent(
  form: Partial<Student>
): Promise<Student[]> {
  const updatedStudent: Student = {
    id: form.id || '',
    name: form.name || '',
    email: form.email || '',
    section: form.section || '',
    group: form.group || '',
    role: form.role || '',
    imageUrl: form.imageUrl || '',
    notes: form.notes || '',
    loopStatus: form.loopStatus || '',
    githubStatus: form.githubStatus || ''
  };
  const studentSaveService = StudentSaveService.createDefault();
  const studentLoadService = StudentLoadService.createDefault();
  const data = await studentLoadService.loadStudents();

  const exists = data.some((s) => s.id === updatedStudent.id);

  const updatedData = exists
    ? data.map((s) => s.id === updatedStudent.id ? updatedStudent : s)
    : [...data, updatedStudent];

  studentSaveService.save(updatedData);

  return updatedData;
}
