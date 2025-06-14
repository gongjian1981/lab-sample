import { EVALUATION_DATA_STORAGE_KEY, EVALUATION_FILENAME_STORAGE_KEY } from '../../../constants';
import { CsvHandler } from '../../../CsvHandler/csvHandler';
import { localStorageService } from '../../../localStroageService';
import type { EvaluationRow } from '../../Heatmap/Services/evaluation';

export const saveUploadedEvaluationData = (data: EvaluationRow[], fileName: string) => {
  localStorageService.save(EVALUATION_DATA_STORAGE_KEY, data);
  localStorageService.save(EVALUATION_FILENAME_STORAGE_KEY, fileName);
  CsvHandler.saveDataToFile(fileName, data);
};