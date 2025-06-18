import { StudentLoadService } from '../../Student/Services/StudentLoadService';
import { StudentSaveService } from '../../Student/Services/StudentSaveService';

export async function enrollStudentToPlatform(
  studentId: string,
  platform: 'github' | 'loop'
): Promise<boolean> {
  try {
    const loadService = StudentLoadService.createDefault();
    const saveService = StudentSaveService.createDefault();

    const students = await loadService.loadStudents();

    let found = false;

    const updated = students.map((s) => {
      if (s.id === studentId) {
        found = true;
        if (platform === 'github') s.githubStatus = 'enrolled';
        if (platform === 'loop') s.loopStatus = 'enrolled';
      }
      return s;
    });

    if (found) {
      await saveService.save(updated); // 👈 确保 save 是异步的
      return true;
    }

    return false;
  } catch (error) {
    console.error('Enrollment failed:', error);
    return false;
  }
}
