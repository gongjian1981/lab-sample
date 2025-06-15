import { Student } from './StudentInfo';
import { getAllStudents } from './getAllStudents';
import { saveStudents } from './saveStudent';

/**
 * Saves or updates a single student entry.
 */
export function updateStudent(
  form: Partial<Student>
): Student[] {
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

  const data: Student[] = getAllStudents();
  const exists = data.some((s) => s.id === updatedStudent.id);

  const updatedData = exists
    ? data.map((s) => s.id === updatedStudent.id ? updatedStudent : s)
    : [...data, updatedStudent];

  saveStudents(updatedData);

  return updatedData;
}
