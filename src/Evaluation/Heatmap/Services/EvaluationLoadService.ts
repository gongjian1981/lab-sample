import { EVALUATION_DATA_STORAGE_KEY, EVALUATION_FILENAME_STORAGE_KEY } from '../../../constants';
import { CsvFileService } from '../../../CsvHandler/CsvFileService';
import { FileService } from '../../../CsvHandler/FileService';
import { LocalStorage, StorageService } from '../../../localStroageService';
import type { EvaluationRow } from './evaluation';

export class EvaluationLoadService {
  constructor(
    private storageService: StorageService,
    private fileService: FileService
  ) {}

  static createDefault(): EvaluationLoadService {
    const storage = new LocalStorage();
    const csvHandler = new CsvFileService();
    return new EvaluationLoadService(storage, csvHandler);
  }

  async loadEvaluations(): Promise<EvaluationRow[]> {
    try {
      const data = this.storageService.load<EvaluationRow[]>(EVALUATION_DATA_STORAGE_KEY);
      if (data) {
        return data;
      }

      const fileName = this.storageService.load<string>(EVALUATION_FILENAME_STORAGE_KEY);
      if (fileName) {
        const fileData = await this.fileService.loadDataFromFile<EvaluationRow>(fileName);
        if (fileData && fileData.length > 0) {
          this.storageService.save(EVALUATION_DATA_STORAGE_KEY, fileData);
          return fileData;
        }
      }
    } catch (error) {
      console.error('Failed to load evaluations:', error);
    }

    return [];
  }
}
