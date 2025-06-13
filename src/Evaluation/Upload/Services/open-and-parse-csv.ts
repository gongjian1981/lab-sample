import { CsvHandler } from '../../../CsvHandler/csv-handler';
import { EvaluationRow } from '../Types/EvaluationTypes';

/**
 * Opens a CSV file using Electron API and parses it into EvaluationRow[]
 */
export async function openAndParseCsv(): Promise<{ filePath: string; data: EvaluationRow[] } | null> {
  const result = await window.electronAPI.openCsvFile();
  if (!result || !result.filePath) return null;

  const parsedData = CsvHandler.parse<EvaluationRow>(result.content);
  return { filePath: result.filePath, data: parsedData };
}
