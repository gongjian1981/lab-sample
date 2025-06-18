export interface FileService {
  loadDataFromFile<T = unknown>(input: File | string): Promise<T[]>;
  saveDataToFile<T extends object>(filePath: string, data: T[]): boolean;
}