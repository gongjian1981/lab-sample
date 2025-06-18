import Papa from 'papaparse';
import { FileService } from './FileService';

type ElectronAPI = {
  saveToCsvFile(filePath: string, csvContent: string): void;
};

export class CsvFileService implements FileService {
  constructor(private electronAPI?: ElectronAPI) {}

  async loadDataFromFile<T = unknown>(input: File | string): Promise<T[]> {
    if (typeof input === 'string') {
      // wait for electronAPI to be available
      //return await window.electronAPI.loadCsvByPath<T>(input);
    }

    return await new Promise<T[]>((resolve, reject) => {
      if (!(input instanceof File)) {
        reject(new Error('Input must be a File object.'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result as string;
          const result = Papa.parse<T>(text, {
            header: true,
            skipEmptyLines: true,
          });
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(input);
    });
  }

  saveDataToFile<T extends object>(filePath: string, data: T[]): boolean {
    if (!this.electronAPI) { // wait for electronAPI to be available
      return true;
    }
    if (!this.electronAPI?.saveToCsvFile) {
      console.warn('Electron API is not available.');
      return false;
    }

    try {
      const csv = Papa.unparse(data);
      this.electronAPI.saveToCsvFile(filePath, csv);
      return true;
    } catch (error) {
      console.error('Error saving CSV file:', error);
      return false;
    }
  }
}
