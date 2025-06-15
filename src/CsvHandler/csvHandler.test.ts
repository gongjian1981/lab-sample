import { CsvHandler } from './csvHandler';

interface TestRow {
  name: string;
  score: string;
}

describe('CsvHandler', () => {
  beforeAll(() => {
    // Mock the electronAPI global
    window.electronAPI = {
      saveToCsvFile: jest.fn(),
    };
  });

  test('save() should convert data to CSV and call electronAPI.saveToCsvFile', () => {
    const testData: TestRow[] = [
      { name: 'Alice', score: '90' },
      { name: 'Bob', score: '85' },
    ];

    CsvHandler.saveDataToFile<TestRow>('mock/path.csv', testData);

    expect(window.electronAPI.saveToCsvFile).toHaveBeenCalledWith(
      'mock/path.csv',
      expect.stringContaining('name,score') // Check header exists
    );
  });

  test('parse() should return typed objects from CSV string', () => {
    const csvText = `name,score\nAlice,90\nBob,85`;
    const result = CsvHandler.parse<TestRow>(csvText);

    expect(result).toEqual([
      { name: 'Alice', score: '90' },
      { name: 'Bob', score: '85' },
    ]);
  });
});
