import { CsvFileService } from './CsvFileService';
import type { FileService } from './FileService';

describe('CsvFileService', () => {
  let service: FileService;

  beforeEach(() => {
    service = new CsvFileService(); // no Electron
  });

  it('parses file correctly using getDataFromFile', async () => {
    const content = 'name,age\nAlice,25';
    const mockFile = new File([content], 'test.csv', { type: 'text/csv' });

    const result = await service.getDataFromFile<{ name: string; age: string }>(mockFile);
    expect(result).toEqual([{ name: 'Alice', age: '25' }]);
  });

  it('returns false when saving without Electron API', () => {
    const success = service.saveDataToFile('file.csv', [{ name: 'A' }]);
    expect(success).toBe(false);
  });

  it('returns true when saving succeeds using Electron API', () => {
    const mockSave = jest.fn();
    const electronAPI = { saveToCsvFile: mockSave };
    const withElectron = new CsvFileService(electronAPI);

    const success = withElectron.saveDataToFile('test.csv', [{ name: 'A' }]);
    expect(success).toBe(true);
    expect(mockSave).toHaveBeenCalled();
  });

  it('returns false if Papa.unparse throws', () => {
    const circular: any = {};
    circular.self = circular;

    const mockSave = jest.fn();
    const electronAPI = { saveToCsvFile: mockSave };
    const withElectron = new CsvFileService(electronAPI);

    const result = withElectron.saveDataToFile('fail.csv', [circular]);
    expect(result).toBe(false);
  });
});
