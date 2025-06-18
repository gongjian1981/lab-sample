import { STUDENT_DATA_STORAGE_KEY, STUDENT_FILENAME_STORAGE_KEY } from '../../../constants';
import { FileService, CsvFileService } from '../../../CsvHandler/index';
import { StorageService, LocalStorage } from '../../../localStroageService/index';
import { Student } from './StudentInfo';

export class StudentSaveService {
  constructor(
    private storageService: StorageService,
    private fileService: FileService
  ) {}

  static createDefault(): StudentSaveService {
    const storage = new LocalStorage();
    const csvHandler = new CsvFileService();
    return new StudentSaveService(storage, csvHandler);
  }

  save(data: Student[]): boolean {
    try {
      this.storageService.save(STUDENT_DATA_STORAGE_KEY, data);
      const fileName = this.storageService.load<string>(STUDENT_FILENAME_STORAGE_KEY);
      if (fileName) {
        this.fileService.saveDataToFile(fileName, data);
      }
    } catch (error) {
      console.error('Error saving student data:', error);
      return false;
    }
    return true;
  }
}