import { EVALUATION_DATA_STORAGE_KEY, EVALUATION_FILENAME_STORAGE_KEY } from '../../../constants';
import { CsvHandler } from '../../../CsvHandler/csvHandler';
import { saveToStorage } from '../../../localStroageService/localStroageService';
import type { EvaluationRow } from '../../Heatmap/Services/evaluation';

export const saveUploadedEvaluationData = (data: EvaluationRow[], fileName: string) => {
  saveToStorage(EVALUATION_DATA_STORAGE_KEY, data);
  saveToStorage(EVALUATION_FILENAME_STORAGE_KEY, fileName);
  CsvHandler.saveDataToFile(fileName, data);
};