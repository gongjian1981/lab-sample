// This service provides methods to save and load data from localStorage with error handling.
export const localStorageService = {
  save<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving data to localStorage with key: ${key}`, error);
    }
  },

  load<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : null;
    } catch (error) {
      console.error(`Error loading data from localStorage with key: ${key}`, error);
      return null;
    }
  },
};
