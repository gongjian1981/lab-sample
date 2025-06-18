import { EVALUATION_DATA_STORAGE_KEY, EVALUATION_FILENAME_STORAGE_KEY } from '../../../constants';
import { FileService, CsvFileService } from '../../../CsvHandler/index';
import { StorageService, LocalStorage } from '../../../localStroageService/index';
import { EvaluationRow } from '../../Heatmap/Services/evaluation';

export class EvaluationSaveService {
  constructor(
    private storageService: StorageService,
    private fileService: FileService
  ) {}

  static createDefault(): EvaluationSaveService {
    const storage = new LocalStorage();
    const csvHandler = new CsvFileService();
    return new EvaluationSaveService(storage, csvHandler);
  }

  save(data: EvaluationRow[]): boolean {
    try {
      this.storageService.save(EVALUATION_DATA_STORAGE_KEY, data);
      const fileName = this.storageService.load<string>(EVALUATION_FILENAME_STORAGE_KEY);
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