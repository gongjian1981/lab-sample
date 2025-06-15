import type { EvaluationRow } from '../../Heatmap/Services/evaluation';
import { EVALUATION_DATA_STORAGE_KEY, EVALUATION_FILENAME_STORAGE_KEY } from '../../../constants';
import { CsvHandler } from '../../../CsvHandler/csvHandler';
import { saveToStorage, loadFromStorage } from '../../../localStroageService/localStroageService';

export function saveEvaluations(data: EvaluationRow[]): void {
  saveToStorage<EvaluationRow[]>(EVALUATION_DATA_STORAGE_KEY, data); // Save data to localStorage
  
  const filePath = loadFromStorage<string>(EVALUATION_FILENAME_STORAGE_KEY);

  if (filePath) {
    CsvHandler.saveDataToFile(filePath, data);
  } else {
    console.warn('No file path found in localStorage.');
  }
}