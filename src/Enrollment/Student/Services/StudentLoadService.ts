import { STUDENT_DATA_STORAGE_KEY, STUDENT_FILENAME_STORAGE_KEY } from '../../../constants';
import { CsvFileService } from '../../../CsvHandler/CsvFileService';
import { FileService } from '../../../CsvHandler/FileService';
import { LocalStorage, StorageService } from '../../../localStroageService';
import { Student } from './StudentInfo';

export class StudentLoadService {
  constructor(
    private storageService: StorageService,
    private fileService: FileService
  ) {}

  static createDefault(): StudentLoadService {
    const storage = new LocalStorage();
    const csvHandler = new CsvFileService();
    return new StudentLoadService(storage, csvHandler);
  }

  async loadStudents(): Promise<Student[]> {
    try {
      const data = this.storageService.load<Student[]>(STUDENT_DATA_STORAGE_KEY);
      if (data) {
        return data;
      }

      const fileName = this.storageService.load<string>(STUDENT_FILENAME_STORAGE_KEY);
      if (fileName) {
        const fileData = await this.fileService.loadDataFromFile<Student>(fileName);
        if (fileData && fileData.length > 0) {
          this.storageService.save(STUDENT_DATA_STORAGE_KEY, fileData);
          return fileData;
        }
      }
    } catch (error) {
      console.error('Failed to load Students:', error);
    }

    return [];
  }
}
