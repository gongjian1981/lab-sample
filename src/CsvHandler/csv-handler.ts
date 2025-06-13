import Papa from 'papaparse';

declare global {
  interface Window {
    electronAPI?: {
      openCsvFile: () => Promise<{ filePath: string; content: string }>;
      saveToCsvFile: (filePath: string, csvContent: string) => void;
    };
  }
}

/**
 * A unified CSV handler for web and Electron environments.
 */
export const CsvHandler = {
  /**
   * Parse a raw CSV string into an array of objects.
   * @param csvText - The CSV content as plain text
   */
  parse<T = unknown>(csvText: string): T[] {
    const result = Papa.parse<T>(csvText, {
      header: true,
      skipEmptyLines: true,
    });
    return result.data;
  },

  /**
   * Parse a File object selected via <input type="file" /> or drag & drop.
   * @param file - The uploaded file object
   */
  async parseFromFile<T = unknown>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result as string;
          const data = CsvHandler.parse<T>(text);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },

  /**
   * Open a local file using Electron's dialog and parse its contents.
   * Returns null if canceled.
   */
  async openAndParse<T = unknown>(): Promise<{ data: T[]; filePath: string } | null> {
    try {
      if (!window.electronAPI?.openCsvFile) {
        console.warn('openAndParse requires Electron with preload API.');
        return null;
      }

      const result = await window.electronAPI.openCsvFile();
      if (!result || !result.filePath) return null;

      const data = CsvHandler.parse<T>(result.content);
      return { data, filePath: result.filePath };
    } catch (error) {
      console.error('CsvHandler.openAndParse failed:', error);
      return null;
    }
  },

  /**
   * Save an array of objects to a CSV file using Electron.
   */
  save<T extends object>(filePath: string, data: T[]): void {
    if (!window.electronAPI?.saveToCsvFile) {
      console.warn('CsvHandler.save requires Electron with preload API.');
      return;
    }

    const csv = Papa.unparse(data);
    window.electronAPI.saveToCsvFile(filePath, csv);
  },
};
