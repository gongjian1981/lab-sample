import { STUDENT_DATA_STORAGE_KEY, STUDENT_FILENAME_STORAGE_KEY } from '../../../constants';
import { saveToStorage,loadFromStorage } from '../../../localStroageService/localStroageService';
import { CsvHandler } from '../../../CsvHandler/csvHandler';
import { Student } from './StudentInfo';

export function saveStudents(data: Student[]) {
  saveToStorage(STUDENT_DATA_STORAGE_KEY, data);
  const filePath = loadFromStorage<string>(STUDENT_FILENAME_STORAGE_KEY);

  if (filePath) {
    CsvHandler.saveDataToFile(filePath, data);
  } else {
    console.warn('No file path found in localStorage.');
  }
}
