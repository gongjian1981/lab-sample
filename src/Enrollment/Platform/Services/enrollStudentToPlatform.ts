// Update the import path below if the actual file location or name is different
import type { EnrollmentStatus } from "../../Student/Services/StudentInfo"; // Make sure EnrollmentStatus is an enum or const, not just a type
import { getAllStudents } from "../../Student/Services/getAllStudents";
import { saveStudents } from "../../Student/Services/saveStudent";

export function enrollStudentToPlatform(
  studentId: string,
  platform: 'loop' | 'github',
): boolean {
  const students = getAllStudents();
  if (!students) { 
    console.error("No students found.");
    return false;
  }
  if (platform === 'loop') {
    const student = students.find(s => s.id === studentId);
    if (!student) {
      console.error(`Student with ID ${studentId} not found.`);
      return false;
    }
    student.loopStatus = "enrolled";
  }
  if (platform === 'github') {
    const student = students.find(s => s.id === studentId);
    if (!student) {
      console.error(`Student with ID ${studentId} not found.`);
      return false;
    }
    student.githubStatus = "enrolled";
  }
  // Save the updated students back to storage
  saveStudents(students);
  return true;
}