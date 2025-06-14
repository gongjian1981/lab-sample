import type { EvaluationRow } from '../../Heatmap/Services/evaluation';
import { EVALUATION_DATA_STORAGE_KEY, EVALUATION_FILENAME_STORAGE_KEY } from '../../../constants';
import { CsvHandler } from '../../../CsvHandler/csvHandler';
import { localStorageService } from '../../../localStroageService';

export function saveEvaluations(data: EvaluationRow[]): void {
  localStorageService.save<EvaluationRow[]>(EVALUATION_DATA_STORAGE_KEY, data); // Save data to localStorage
  
  const filePath = localStorageService.load<string>(EVALUATION_FILENAME_STORAGE_KEY);

  if (filePath) {
    CsvHandler.saveDataToFile(filePath, data);
  } else {
    console.warn('No file path found in localStorage.');
  }
}