import { STUDENT_DATA_STORAGE_KEY, STUDENT_FILENAME_STORAGE_KEY } from '../../../constants';
import { CsvHandler } from '../../../CsvHandler/csvHandler';
import { saveToStorage } from '../../../localStroageService/localStroageService';
import type { Student } from '../../Student/Services/StudentInfo';

export const saveUploadedStudentData = (data: Student[], fileName: string) => {
  saveToStorage(STUDENT_DATA_STORAGE_KEY, data);
  saveToStorage(STUDENT_FILENAME_STORAGE_KEY, fileName);
  CsvHandler.saveDataToFile(fileName, data);
};